from django.db.models import Sum

from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import CustomUser, Creditor, Profile, Wallet, WalletTransaction
from .services import paystack

import requests


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


class WalletSerializer(serializers.ModelSerializer):

    balance = serializers.SerializerMethodField()

    def get_balance(self, obj):
        bal = WalletTransaction.objects.filter(wallet=obj).aggregate(Sum("amount"))[
            "amount__sum"
        ]
        if bal == "null":
            return float(0.00)

        return bal

    class Meta:
        model = Wallet
        fields = ["id", "balance"]


class CreditorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creditor
        fields = [
            "name",
            "amount_owned",
            "date_due",
            "bank_code",
            "account_number",
            "status",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        wallet = Wallet.objects.get(user=user)
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
        user = self.context["request"].user
        wallet = Wallet.objects.get(user=user)

        instance.name = validated_data["name"]
        instance.amount_owned = validated_data["amount_owned"]
        instance.bank_code = validated_data["bank_code"]
        instance.account_number = validated_data["account_number"]

        instance.save()
        payload = {
            "type": "nuban",
            "name": instance.name,
            "account_number": instance.account_number,
            "bank_code": instance.bank_code,
        }
        recipient_code = paystack.create_transfer_recipient(payload)
        creditor = Creditor.objects.update(
            wallet=wallet, recipient_code=recipient_code, **validated_data
        )
        return creditor
