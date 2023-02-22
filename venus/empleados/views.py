"""Vistas para Empleados

    Autors: Roberto Ruiz
            Adán Agirre
            Maria José Valverde

    Date: 21/02/2023
"""
from .models import Empleado
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict

class EmpleadoManagement(APIView):
    """Clase donde estan las funciones simples
    """
    def get(self, request):
        """Funcion para obtener todos los empleados

        Args:
            request

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        empleados = Empleado.objects.all().values()
        return Response(empleados, 200)
    
    def post(self, request):
        """Funcion para insertar un nuevo empleado

        Args:
            request

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
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
        return Response(model_to_dict(empleadoMod), 200)

class EmpleadoManagementId(APIView):
    """Clase donde se alojan las funciones que necesitan id
    """
    def get(self, request, id):
        """Funcion para obtener el empleado pasandole el id

        Args:
            request
            id (num): Id del empleado

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        empleados = Empleado.objects.get(id__icontains=id).values()
        return Response(empleados, 200)
    
    def delete(self, request, id):
        """Funcion para eliminar empleado pasandole un id

        Args:
            request
            id (num): Id del empleado

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        empleadoBorrar = Empleado.objects.filter(id__icontains=id)
        empleadoBorrar.delete()
        return Response(model_to_dict(empleadoBorrar), 200)
    
    def put(self, request, id):
        """Funcion para modificar un empleado

        Args:
            request
            id (num): Id del empleado

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        empleadoModify = Empleado.objects.get(id__contains = id)
        empleadoModify.nif = request.data['nif']
        empleadoModify.nombre = request.data['nombre']
        empleadoModify.fecha_nac = request.data['fecha_nac']
        empleadoModify.correo = request.data['correo']
        empleadoModify.telefono = request.data['telefono']
        empleadoModify.rol = request.data['rol']
        try:
            empleadoModify.save()
        except Exception as e:
            print(e)
            return Response({"error": e}, 500)
        return Response(model_to_dict(empleadoModify), 200)
    