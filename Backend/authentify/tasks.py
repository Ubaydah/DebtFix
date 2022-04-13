import logging
from unicodedata import name
from .models import WalletTransaction, Creditor
from .enums import Status, TransactionStatus

logger = logging.getLogger(__name__)


def handle_webhook(payload: dict):
    logger.info(f"Handling webhook of event -> {payload['event']}")

    if payload["event"] == "charge.success":
        transaction_ref = payload["data"]["reference"]
        try:
            transaction = WalletTransaction.objects.get(
                paystack_reference=transaction_ref
            )
            transaction.transaction_status = TransactionStatus.SUCCESS
            transaction.save()
        except WalletTransaction.DoesNotExist:
            logger.error(f"Unable to find transaction with ID -> {transaction_ref}")

    if payload["event"] == "transfer.success":
        try:
            transaction_ref = payload["data"]["reference"]
            amount = payload["data"]["amount"]
            transaction = WalletTransaction.objects.get(
                paystack_reference=transaction_ref
            )
            transaction.transaction_status = TransactionStatus.SUCCESS
            transaction.amount = -amount
            transaction.save()

            creditor = Creditor.objects.get(name=transaction.destination.name)
            if creditor.amount_owned == amount:
                creditor.status = Status.PAID
                creditor.amount_owned = 0
                creditor.save()
            else:
                creditor.amount_owned -= amount
                creditor.save()
        except WalletTransaction.DoesNotExist:
            logger.error(f"Unable to find transaction with ID -> {transaction_ref}")
