import logging
from .models import WalletTransaction, Creditor
from .enums import Status, TransactionStatus
from huey.contrib.djhuey import db_task

logger = logging.getLogger("huey")


@db_task()
def change_to_success(transaction, amount):
    creditor = Creditor.objects.select_related("wallet").get(
        name=transaction.destination.name
    )
    if creditor.amount_owned == amount:
        creditor.status = Status.PAID
        creditor.amount_owned = 0
        creditor.save()
    else:
        creditor.amount_owned -= amount
        creditor.save()


@db_task()
def handle_webhook(payload: dict):
    logger.info(f"Handling webhook of event -> {payload['event']}")

    if payload["event"] == "charge.success":
        transaction_ref = payload["data"]["reference"]
        try:
            transaction = WalletTransaction.objects.select_related("wallet").get(
                paystack_reference=transaction_ref
            )
            transaction.transaction_status = TransactionStatus.SUCCESS
            transaction.save()
        except WalletTransaction.DoesNotExist:
            logger.error(f"Unable to find transaction with ID -> {transaction_ref}")

    elif payload["event"] == "transfer.success":
        try:
            transaction_ref = payload["data"]["reference"]
            amount = payload["data"]["amount"]
            transaction = WalletTransaction.objects.select_related("wallet").get(
                paystack_reference=transaction_ref
            )
            transaction.transaction_status = TransactionStatus.SUCCESS
            transaction.amount = -amount
            transaction.save()

            change_to_success(transaction, amount)

        except WalletTransaction.DoesNotExist:
            logger.error(f"Unable to find transaction with ID -> {transaction_ref}")
