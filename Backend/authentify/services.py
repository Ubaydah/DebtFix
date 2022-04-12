import logging
import requests
from uuid import uuid4
from django.conf import settings
from requests.exceptions import RequestException

logger = logging.getLogger(__name__)


class Paystack:

    headers = {"authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"}

    def create_transfer_recipient(self, payload):
        try:
            response = requests.post(
                f"{settings.PAYSTACK_URL}/transferrecipient",
                data=payload,
                headers=self.headers,
            )

            if response.status_code == 201:
                response = response.json()
                return response["data"]["recipient_code"]
        except RequestException as err:
            logger.exception(err)
            return None

    def initialize_transaction(self, payload):

        try:
            response = requests.post(
                f"{settings.PAYSTACK_URL}/transaction/initialize",
                data=payload,
                headers=self.headers,
            )

            if response.status_code == 200:
                response = response.json()
                return (
                    response["data"]["authorization_url"],
                    response["data"]["reference"],
                )

        except RequestException as err:
            logger.exception(err)
            return None

    def initialize_transfer(self, payload):
        try:
            response = requests.post(
                f"{settings.PAYSTACK_URL}/transfer", data=payload, headers=self.headers
            )
            if response.status_code == 200:
                response = response.json()
                return response["data"]["reference"]
        except RequestException as err:
            logger.exception(err)
            return None


paystack = Paystack()
