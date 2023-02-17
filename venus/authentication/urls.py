from django.urls import path

from . import views

urlpatterns = [
    # Estas son las url relacionadas con el login de usuarios
    path("", views.CustomAuthTokenLogin.as_view(), name="login"),
]
