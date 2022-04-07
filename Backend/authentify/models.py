from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import SlugField
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify

from .enums import Banks, Gender, Status
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    """
    custom user created with email as the username field
    """
    email = models.EmailField(_('email address'), unique=True)
    slug = SlugField(max_length=250, unique=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

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
    firstname = models.CharField(max_length=250, blank=True)
    lastname = models.CharField(max_length=250, blank=True)
    gender = models.CharField(max_length=250, blank=True, choices=Gender.choices)
    phone_number = models.IntegerField(null=True)
    
    def __str__(self):
        return f"{self.user.username} Profile"

# class Creditor(BaseClass):
#     user = 
#     name = 
#     amount_owned =
#     date_due =
#     bank_code =
#     account_number =
#     status =
