from django.db import models

# Create your models here.
class Empleado(models.Model):
    nif = models.CharField(max_length=8)
    nombre = models.CharField(max_length=50)
    fecha_nac = models.CharField(max_length=50)
    correo = models.CharField(max_length=100)
    telefono = models.IntegerField(max_length=9)
    rol = models.CharField(choices=(
            ('co', "Cocinero"),
            ('ca', "Camarero"),
            ('ba', "Barra")
        ),
        max_length=2)
