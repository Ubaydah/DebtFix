from django.urls import path
from .views import Register, Login

urlpatterns = [
    path("register/", Register.as_view(), name="register"),
    path("login/", Login.as_view(), name="login"),
]
