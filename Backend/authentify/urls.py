from django.urls import path
from .views import (
    Register,
    Login,
    CreateProfile,
    UpdateProfile,
    GetProfile,
    UserInfo,
    WalletInfo,
    CreateCreditor,
    UpdateCreditor,
    GetCreditors,
    DepositFunds,
    PayCreditorView,
    WalletTransactionView,
    DashboardStatistics,
    PaystackWebhookView,
)


#7da8187839ade9b1cd1a8b2072e93da9410ea343

urlpatterns = [
    path("register/", Register.as_view(), name="register"),
    path("login/", Login.as_view(), name="login"),
    path("profile/create/", CreateProfile.as_view(), name="create-profile"),
    path("profile/<int:pk>/update/", UpdateProfile.as_view(), name="update-profile"),
    path("wallet/info/", WalletInfo.as_view(), name="wallet-info"),
    path("user/info/", UserInfo.as_view(), name="user-info"),
    path("creditor/create/", CreateCreditor.as_view(), name="create-creditor"),
    path("creditor/<int:pk>/update/", UpdateCreditor.as_view(), name="update-creditor"),
    path("profile/get/", GetProfile.as_view(), name="get-profile"),
    path("creditors/", GetCreditors.as_view(), name="get-creditors"),
    path("payment/deposit/", DepositFunds.as_view(), name="depositfunds"),
    path("payment/pay-debt/", PayCreditorView.as_view(), name="pay-debt"),
    path("payment/transactions/", WalletTransactionView.as_view(), name="get-transactions"),
    path("payment/statistics/", DashboardStatistics.as_view(), name="statistics"),
    path(
        "payment/paystack/webhook/",
        PaystackWebhookView.as_view(),
        name="paystack-webhook",
    ),
]
