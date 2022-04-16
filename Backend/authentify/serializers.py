from django.db.models import Sum

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

from .enums import Status, TransactionStatus, TransactionType
from .models import CustomUser, Creditor, Profile, Wallet, WalletTransaction
from .services import paystack
from .utils import is_amount, get_balance, is_valid_creditor


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data["email"], username=validated_data["username"]
        )
        user.set_password(validated_data["password"])
        user.save()
        Token.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
            "firstname",
            "lastname",
            "gender",
            "phone_number",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        profile = Profile.objects.create(user=user, **validated_data)
        return profile

    def update(self, instance, validated_data):

        instance.firstname = validated_data["firstname"]
        instance.lastname = validated_data["lastname"]
        instance.gender = validated_data["gender"]
        instance.phone_number = validated_data["phone_number"]

        instance.save()

        profile = Profile.objects.update(**validated_data)

        return profile


class WalletSerializer(serializers.ModelSerializer):

    balance = serializers.SerializerMethodField()

    def get_balance(self, obj):
        bal = (
            WalletTransaction.objects.select_related("wallet")
            .filter(wallet=obj, transaction_status=TransactionStatus.SUCCESS)
            .aggregate(Sum("amount"))["amount__sum"]
        )
        return bal

    class Meta:
        model = Wallet
        fields = ["id", "balance"]


class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = "__all__"


class CreditorSerializer(serializers.ModelSerializer):
    amount_owned = serializers.IntegerField(validators=[is_amount])
    name = serializers.CharField(max_length=200)

    class Meta:
        model = Creditor
        fields = [
            "id",
            "name",
            "amount_owned",
            "date_due",
            "bank_code",
            "account_number",
            "status",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        wallet = Wallet.objects.select_related("user").get(user=user)

        if Creditor.objects.filter(name=validated_data["name"], wallet=wallet).exists():
            raise serializers.ValidationError(
                {"detail": "Creditor with this name exists"}
            )
        else:
            payload = {
                "type": "nuban",
                "name": validated_data["name"],
                "account_number": validated_data["account_number"],
                "bank_code": validated_data["bank_code"],
            }
            recipient_code = paystack.create_transfer_recipient(payload)
            creditor = Creditor.objects.create(
                wallet=wallet, recipient_code=recipient_code, **validated_data
            )
            return creditor

    def update(self, instance, validated_data):

        instance.name = validated_data["name"]
        instance.amount_owned = validated_data["amount_owned"]
        instance.bank_code = validated_data["bank_code"]
        instance.account_number = validated_data["account_number"]

        instance.save()
        return instance


class DepositFundsSerializer(serializers.ModelSerializer):
    amount = serializers.IntegerField(validators=[is_amount])
    email = serializers.EmailField()
    narration = serializers.CharField(max_length=100)

    class Meta:
        model = WalletTransaction
        fields = ["email", "amount", "narration"]

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            return value
        raise ValidationError({"detail": "Email not found"})

    def save(self):
        user = self.context["request"].user
        wallet = Wallet.objects.select_related("user").get(user=user)

        validated_data = self.validated_data
        payload = {
            "amount": validated_data["amount"],
            "email": validated_data["email"],
            "currency": "NGN",
        }
        url, txn_ref = paystack.initialize_transaction(payload)

        WalletTransaction.objects.create(
            wallet=wallet,
            amount=validated_data["amount"],
            narration=validated_data["narration"],
            transaction_type=TransactionType.DEPOSIT,
            paystack_reference=txn_ref,
        )

        return url


class PayCreditorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    amount = serializers.IntegerField(validators=[is_amount])

    class Meta:
        model = WalletTransaction
        fields = ["name", "amount", "narration"]

    def validate_name(self, value):
        user = self.context["request"].user
        wallet = Wallet.objects.select_related("user").get(user=user)

        creditor = Creditor.objects.select_related("wallet").get(
            name=value, wallet=wallet
        )
        if creditor.status == Status.PAID:
            raise serializers.ValidationError({"detail": "creditor's debt paid"})
        else:
            return value

    def save(self):
        user = self.context["request"].user
        wallet = Wallet.objects.select_related("user").get(user=user)

        validated_data = self.validated_data
        bal = get_balance(wallet)

        if bal < validated_data["amount"]:
            raise serializers.ValidationError({"detail": "Insufficient funds"})
        else:
            creditor = Creditor.objects.select_related("wallet").get(
                name=validated_data["name"], wallet=wallet
            )
            recipient_code = creditor.recipient_code
            payload = {
                "source": "balance",
                "amount": validated_data["amount"],
                "recipient": recipient_code,
                "currency": "NGN",
            }
            reference = paystack.initialize_transfer(payload)

            WalletTransaction.objects.create(
                wallet=wallet,
                amount=validated_data["amount"],
                narration=validated_data["narration"],
                transaction_type=TransactionType.CREDIT,
                paystack_reference=reference,
                destination=creditor,
            )

            return creditor
