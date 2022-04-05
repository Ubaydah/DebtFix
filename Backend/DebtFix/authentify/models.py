from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import SlugField
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify

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