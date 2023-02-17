from django.http import JsonResponse
from django.http import HttpResponse
from .models import Producto
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response

class ProductoManagement(APIView):
    def get(self, request):
        productos = Producto.objects.all().values()
        return Response(productos, 200)
    
    def post(self, request):
        try:
            productoNuevo = Producto()
            productoNuevo.categoria = request.data['categoria']
            productoNuevo.nombre = request.data['nombre']
            productoNuevo.descripcion = request.data['descripcion']
            productoNuevo.precio = request.data['precio']
            productoNuevo.stock = request.data['stock']
            productoNuevo.save()
        except Exception:
            return Response(f"ERROR DE INSERCIÓN {productoNuevo}", 500)
        return (productoNuevo, 201)



class ProductoManagementId(APIView):
    def get(self, request, id):
        try:
            producto = Producto.objects.get(id__icontains=id).values()
        except Exception:
            return Response(f"ERROR - PROD {id}", 404)
        return Response(producto, 201)
    
    def delete(self, request, id):
        try:
            productoBorrar = Producto.objects.get(id__icontains=id)
        except Exception:
            return Response(f"ERROR - PROD {id}", 404)
        
        mostrar = productoBorrar.values()
        try:
            productoBorrar.delete()
        except Exception:
            return Response(f"ERROR DE BORRADO - PROD {id}", 500)
        
        return Response(mostrar, 201)

