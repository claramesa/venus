from datetime import timezone
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
import pytz
from rest_framework.authtoken.models import Token as AuthToken

app_label = "token"

class Token(AuthToken):
    key = models.CharField("Key", max_length=40, db_index=True, unique=True)
    print(settings.AUTH_USER_MODEL)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

def custom_create_token(token_model, user, serializer):
    token = token_model.objects.create(user=user)
    utc_now = timezone.now()
    utc_now = utc_now.replace(tzinfo=pytz.utc)
    token.created = utc_now
    token.save()
    return token
