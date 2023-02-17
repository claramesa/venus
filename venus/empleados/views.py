from .models import Empleado
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict

class EmpleadoManagement(APIView):
    def get(self, request):
        empleados = Empleado.objects.all().values()
        return Response(empleados, 200)
    def post(self, request):
        empleadoMod = Empleado() 
        empleadoMod.nif = request.data['nif']
        empleadoMod.nombre = request.data['nombre']
        empleadoMod.fecha_nac = request.data['fecha_nac']
        empleadoMod.correo = request.data['correo']
        empleadoMod.telefono = request.data['telefono']
        empleadoMod.rol = request.data['rol']
        try:
            empleadoMod.save()
        except Exception as e:
            print(e)
            return Response({"error": e}, 500)
        return Response({"insertado": model_to_dict(empleadoMod)}, 200)

class EmpleadoManagementId(APIView):
    def get(self, request, id):
        empleados = Empleado.objects.get(id__icontains=id).values()
        return Response(empleados, 200)
    
    def delete(self, request, id):
        empleadoBorrar = Empleado.objects.filter(id__icontains=id)
        mostrar = empleadoBorrar.values()
        empleadoBorrar.delete()
        return Response(mostrar.values(), 200)
    