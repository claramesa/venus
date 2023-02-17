from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

from .models import Token


# Create your views here.
class CustomAuthTokenLogin(ObtainAuthToken):
    """
    La autorizacion personalizada de token donde se escribe mediante un post en formato json el username y password
    """

    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        """_summary_
            Inicio de sesion que devuelva un token
        Args:
            request (_type_): requesr

        Returns:
            Response: Devuelve si el usuario existe el token, el id, el username y el token
        """
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "id_user": user.pk, "username": user.username}
        )
    
    def get(self, request):
        """_summary_
            Mediante un token nos devuelve quien es
        Args:
            request (_type_):

        Returns:
            Devuelve si es correspondiente el token con un usuario, devuelve los datos del usuario
        """
        if request.META.get("HTTP_AUTHORIZATION") is None:
            raise AuthenticationFailed(
                {"error": "Invalid or Inactive Token", "is_authenticated": False}
            )
        return Response(
            {
                "username": request.user.username,
                "is_admin": request.user.is_superuser,
                "token": request.META.get("HTTP_AUTHORIZATION")[7:],
            },
            200,
        )

