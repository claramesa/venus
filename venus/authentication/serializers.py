from django.contrib.auth.models import User
from rest_framework import serializers


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """
    La clase de la quue se crearan los usuarios
    """

    class Meta:
        model = User
        fields = ("id", "username", "email")


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    """
    Registro del usuario
    """

    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        Args:
            validated_data (_type_):

        Returns:
            Devuelve el usuario validado
        """
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )

        return user
