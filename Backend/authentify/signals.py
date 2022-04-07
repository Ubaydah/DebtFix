from django.db.models.signals import post_save
from .models import CustomUser, Wallet
from django.dispatch import receiver
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_wallet(sender, instance, created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_wallet(sender, instance, **kwargs):
    instance.wallet.save()
