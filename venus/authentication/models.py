from datetime import timezone

import pytz
from django.contrib.auth.models import User
from django.db import models
from rest_framework.authtoken.models import Token as AuthToken

app_label = "token"


class Token(AuthToken):
    """
    La clase que define nuestro token
    """

    key = models.CharField("Key", max_length=40, db_index=True, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


def custom_create_token(token_model, user, serializer):
    """

    Args:
        token_model (_type_): token modelo
        user (_type_): usuario al cual se le va a asignar el token
        serializer (_type_):

    Returns:
        se le devuelve el token con un tiempo establecido de 168 horas de expiracion
    """
    token = token_model.objects.create(user=user)
    utc_now = timezone.now()
    utc_now = utc_now.replace(tzinfo=pytz.utc)
    token.created = utc_now
    token.save()
    return token
