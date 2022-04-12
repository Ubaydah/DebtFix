from .models import WalletTransaction, Creditor
from django.db.models import Sum
from .enums import TransactionStatus

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

def is_amount(value):
    if value <= 0 :
        raise serializers.ValidationError({"detail": "Invalid Amount"})
    return value


def get_balance(wallet):

    bal = WalletTransaction.objects.filter(
        wallet=wallet, transaction_status=TransactionStatus.SUCCESS
    ).aggregate(Sum("amount"))["amount__sum"]

    return bal


def is_valid_creditor(value):
    try:
        Creditor.objects.get(name=value)

    except Creditor.DoesNotExist:
        return ValidationError({"detail": "creditor not found"})
