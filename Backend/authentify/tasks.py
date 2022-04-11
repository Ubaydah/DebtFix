import logging
from .models import WalletTransaction
from .enums import TransactionStatus
from huey.contrib.djhuey import db_task

logger = logging.getLogger("huey")


@db_task()
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
