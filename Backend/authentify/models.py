from email.policy import default
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import SlugField
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify


from .enums import Banks, Gender, Status, TransactionType, TransactionStatus
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    """
    custom user created with email as the username field
    """

    email = models.EmailField(_("email address"), unique=True)
    slug = SlugField(max_length=250, unique=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.username)
        super(CustomUser, self).save(*args, **kwargs)

    def __str__(self):
        return self.email


class BaseClass(models.Model):
    """
    Base class that contains fields other model classes will subclass from
    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        get_latest_by = "updated_at"
        ordering = ("-updated_at", "-created_at")


class Profile(BaseClass):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    firstname = models.CharField(
        _("firstname"), max_length=250, blank=False, null=False
    )
    lastname = models.CharField(_("lastname"), max_length=250, blank=False, null=False)
    gender = models.CharField(
        _("gender"), max_length=250, blank=False, choices=Gender.choices
    )
    phone_number = models.IntegerField(_("phone_number"), null=False)

    def __str__(self):
        return f"{self.user.username} Profile"


class Wallet(BaseClass):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE
    )
    currency = models.CharField(_("currency"), max_length=50, default="NGN")

    def __str__(self):
        return f"{self.user.username} Wallet"


class Creditor(BaseClass):
    wallet = models.ForeignKey(
        Wallet, on_delete=models.CASCADE, related_name="creditors"
    )
    name = models.CharField(_("name"), max_length=250, blank=False)
    amount_owned = models.DecimalField(
        _("amount_owned"), max_digits=11, decimal_places=3
    )
    date_due = models.DateTimeField(_("date_due"), default=timezone.now())
    bank_code = models.CharField(
        _("bank_code"), choices=Banks.choices, max_length=6, null=False, blank=False
    )
    account_number = models.CharField(
        _("account_number"), max_length=10, null=False, blank=False
    )
    recipient_code = models.CharField(_("recipient_code"), max_length=40, null=True)
    status = models.CharField(
        _("status"), choices=Status.choices, max_length=40, default=Status.UNPAID
    )

    def __str__(self):
        return self.name


class WalletTransaction(BaseClass):
    wallet = models.ForeignKey(
        Wallet, on_delete=models.CASCADE, related_name="transactions"
    )
    amount = models.DecimalField(_("amount"), max_digits=11, decimal_places=3)
    narration = models.CharField(
        _("narration"), max_length=100, blank=False, null=False
    )
    transaction_type = models.CharField(
        _("transaction_type"), choices=TransactionType.choices, max_length=100
    )
    transaction_status = models.CharField(
        _("transaction_status"),
        max_length=100,
        choices=TransactionStatus.choices,
        default=TransactionStatus.INITIATED,
    )
    paystack_reference = models.CharField(
        _("paystack_reference"), max_length=100, blank=False, null=True
    )
    # destination = models.ForeignKey(
    #     Creditor, on_delete=models.CASCADE, related_name="destination", blank=True,
    # )

    def __str__(self):
        return self.wallet.user.__str__()
