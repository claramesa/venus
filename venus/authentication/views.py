from rest_framework.authtoken.views import ObtainAuthToken
from .models import Token
from rest_framework.response import Response

#from .modelos.models import AuthToken
from rest_framework.authtoken.views import ObtainAuthToken

# Create your views here.
class CustomAuthTokenLogin(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        print(Token.objects)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id_user': user.pk,
            'username': user.username
        })

class who():
    def get(request):
        print(request)
        return Response({"message": "who"}, 200)