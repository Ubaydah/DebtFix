from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import CustomUser, Profile, Wallet, Creditor
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    CreditorSerializer,
    WalletSerializer,
)


class Login(APIView):

    permission_classes = [
        AllowAny,
    ]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        if user:
            return Response({"token": user.auth_token.key, "email": email})
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

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateProfile(UpdateAPIView):

    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


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

        serializer = self.get_serializer(
            instance, data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Creditor updated successfully"},
            status=status.HTTP_200_OK,
        )
