from django.urls import path
from .views import (
    Register,
    Login,
    CreateProfile,
    UpdateProfile,
    UserInfo,
    WalletInfo,
    CreateCreditor,
    UpdateCreditor,
)

urlpatterns = [
    path("register/", Register.as_view(), name="register"),
    path("login/", Login.as_view(), name="login"),
    path("profile/create/", CreateProfile.as_view(), name="create-profile"),
    path("profile/<int:pk>/update/", UpdateProfile.as_view(), name="update-profile"),
    path("wallet/info/", WalletInfo.as_view(), name="wallet-info"),
    path("user/info/", UserInfo.as_view(), name="user-info"),
    path("creditor/create/", CreateCreditor.as_view(), name="create-creditor"),
    path("creditor/<int:pk>/update/", UpdateCreditor.as_view(), name="update-creditor"),
]

