from django.http import JsonResponse
from django.http import HttpResponse
<<<<<<< remotes/origin/bbdd
from .models import Empleado
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
=======
from django.shortcuts import render
from rest_framework.response import Response
from venus.empleados.models import Empleado
>>>>>>> local

# Create your views here.
def members(request):
    return HttpResponse("Hello world!" + str(request.headers))


class EmpleadoManagement(APIView):
    def get(self, request):
        empleados = Empleado.objects.all().values()
        return Response(empleados, 200)


class EmpleadoManagementId(APIView):
    def get(self, request, id):
        empleados = Empleado.objects.filter(id__icontains=id).values()
        return Response(empleados, 200)
    
    def delete(self, request, id):
        empleadoBorrar = Empleado.objects.filter(id__icontains=id)
        mostrar = empleadoBorrar.values()
        empleadoBorrar.delete()
        return Response(mostrar.values(), 200)