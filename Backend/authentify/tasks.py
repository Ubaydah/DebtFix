import logging
from .models import WalletTransaction
from .enums import TransactionStatus

logger = logging.getLogger(__name__)


def handle_webhook(payload: dict):
    logger.info(f"Handling webhook of event -> {payload['event']}")

    if payload["event"] == "charge.success":
        transaction_ref = payload["data"]["reference"]
        try:
            transaction = WalletTransaction.objects.get(
                paystack_reference=transaction_ref
            )
            transaction.status = TransactionStatus.SUCCESS
            transaction.save()
        except WalletTransaction.DoesNotExist:
            logger.error(f"Unable to find transaction with ID -> {transaction_ref}")
