import datetime

import pytz
from django.conf import settings
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Token


class ExpiringTokenAuthentication(TokenAuthentication):
    """
    La verificacion de que el token existe y es asignado a un usuario
    """

    model = Token

    def authenticate(self, request):
        """

        Args:
            request (_type_): 

        Raises:
            AuthenticationFailed: La autorizacion del token con un usuario falla

        Returns:
            devuelve la informacion relacionada de ese token
        """
        models = self.get_model()
        key = request.META.get('HTTP_AUTHORIZATION')[7:]

        try:
            token = models.objects.select_related("user").get(key=key)
        except models.DoesNotExist:
            raise AuthenticationFailed(
                {"error": "Invalid or Inactive Token", "is_authenticated": False}
            )

        if not token.user.is_active:
            raise AuthenticationFailed(
                {"error": "Invalid user", "is_authenticated": False}
            )
        #REQUIRED_FIELDS = ['username', 'password']  # new

        utc_now = timezone.now()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        if token.created < utc_now - datetime.timedelta(days=7):
            raise AuthenticationFailed(
                {"error": "Token has expired", "is_authenticated": False}
            )
        return token.user, token
