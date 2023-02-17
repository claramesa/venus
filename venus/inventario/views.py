
from .models import Producto, Categoria
from rest_framework.views import APIView
from rest_framework.response import Response

from django.forms.models import model_to_dict

class ProductoManagement(APIView):
    def get(self, request):
        productos = Producto.objects.all().values()
        return Response(productos, 200)
    
    def post(self, request):
        try:
            productoNuevo = Producto()
            productoNuevo.categoria = Categoria.objects.get(pk=request.data['categoria']) 
            productoNuevo.nombre = request.data['nombre']
            productoNuevo.descripcion = request.data['descripcion']
            productoNuevo.precio = request.data['precio']
            productoNuevo.stock = request.data['stock']
            productoNuevo.save()
        except Exception as e:
            print(e)
            return Response({"error": e}, 500)
        return Response({"insertado": model_to_dict(productoNuevo)}, 201)



class ProductoManagementId(APIView):
    def get(self, request, id):
        try:
            producto = model_to_dict(Producto.objects.get(id__icontains=id))
        except Exception:
            return Response({"error": f"ERROR - PROD {id}"}, 404)
        return Response(producto, 201)
    
    def delete(self, request, id):
        try:
            productoBorrar = Producto.objects.get(id__icontains=id)
        except Exception:
            return Response({"error": f"ERROR - PROD {id}"}, 404)
        
        try:
            productoBorrar.delete() 
        except Exception:
            return Response({"error": f"ERROR DE BORRADO - PROD {id}"}, 500)
        
        return Response(model_to_dict(productoBorrar), 201)

