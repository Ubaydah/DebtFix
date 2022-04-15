import json
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
)
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import CustomUser, Profile, Wallet, Creditor, WalletTransaction
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    CreditorSerializer,
    WalletSerializer,
    DepositFundsSerializer,
    PayCreditorSerializer,
    WalletTransactionSerializer,
)
from .tasks import handle_webhook
from .enums import Status


class Login(APIView):

    permission_classes = [
        AllowAny,
    ]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user_data = CustomUser.objects.get(email=email)
        user = authenticate(email=email, password=password)
        if user:
            return Response(
                {
                    "token": user.auth_token.key,
                    "email": email,
                    "id": user_data.id,
                    "username": user_data.username,
                }
            )
        else:
            return Response(
                {"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST
            )


class Register(CreateAPIView):

    permission_classes = ()
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()


class UserInfo(APIView):
    def get(self, request):
        user = request.user
        data = UserSerializer(user).data

        return Response(data)


class WalletInfo(APIView):
    def get(self, request):
        wallet = Wallet.objects.get(user=request.user)
        data = WalletSerializer(wallet).data

        return Response(data)


class CreateProfile(CreateAPIView):

    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateProfile(UpdateAPIView):

    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def put(self, request, *args, **kwargs):

        instance = self.get_object()

        serializer = self.get_serializer(
            instance, data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Profile updated successfully"},
            status=status.HTTP_200_OK,
        )


class GetProfile(APIView):
    def get(self, request):

        profile = Profile.objects.get(user=request.user)
        data = ProfileSerializer(profile).data

        return Response(data)


class CreateCreditor(CreateAPIView):

    serializer_class = CreditorSerializer
    permission_classes = [
        IsAuthenticated,
    ]
    queryset = Creditor.objects.all()

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateCreditor(UpdateAPIView):

    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = CreditorSerializer
    queryset = Creditor.objects.all()

    def put(self, request, *args, **kwargs):

        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Creditor updated successfully"},
            status=status.HTTP_200_OK,
        )


class GetCreditors(APIView):

    serializer_class = CreditorSerializer

    def get(self, request):
        creditors = Creditor.objects.filter(wallet__user=request.user)
        serializer = self.serializer_class(creditors, many=True)

        return Response(serializer.data)


class DepositFunds(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DepositFundsSerializer
    queryset = WalletTransaction.objects.all()

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        response = serializer.save()
        return Response({"authorization_url": response}, status=status.HTTP_201_CREATED)


class PayCreditorView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PayCreditorSerializer
    queryset = WalletTransaction.objects.all()

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        response = serializer.save()

        return Response({"message": "success"})


class WalletTransactionView(APIView):

    serializer_class = WalletTransactionSerializer

    def get(self, request):
        transactions = WalletTransaction.objects.filter(wallet__user=request.user)
        serializer = self.serializer_class(transactions, many=True)

        return Response(serializer.data)


class DashboardStatistics(APIView):

    serializer_class = CreditorSerializer

    def get(self, request):
        creditors = Creditor.objects.filter(wallet__user=request.user).count()
        creditors_paid = Creditor.objects.filter(
            wallet__user=request.user, status=Status.PAID
        ).count()
        creditors_unpaid = Creditor.objects.filter(
            wallet__user=request.user, status=Status.UNPAID
        ).count()

        response = {
            "creditors_all": creditors,
            "creditors_paid": creditors_paid,
            "creditors_unpaid": creditors_unpaid,
        }

        return Response(response)


class PaystackWebhookView(APIView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf-8"))

        handle_webhook(data)

        return Response(data={})
