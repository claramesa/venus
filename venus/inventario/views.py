from django.http import JsonResponse
from django.http import HttpResponse
from .models import Producto
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response


def members(request):
    return HttpResponse("Hello world!" + str(request.headers))


class ProductoManagement(APIView):
    def get(self, request):
        productos = Producto.objects.all().values()
        return Response(productos, 200)


class ProductoManagementId(APIView):
    def get(self, request, id):
        productos = Producto.objects.filter(id__icontains=id).values()
        return Response(productos, 200)
    
    def delete(self, request, id):
        productoBorrar = Producto.objects.filter(id__icontains=id)
        mostrar = productoBorrar.values()
        productoBorrar.delete()
        return Response(mostrar.values(), 200)


@csrf_exempt
def productoId(request, id):
    '''Modificamos o devolvemos un producto por su Id'''
    if request.method == "GET":
        producto = serialize('json', Producto.objects.filter(id__icontains=id))
        return JsonResponse(producto, safe=False)
    elif request.method == "DELETE":
        producto = Producto.objects.filter(pk=id)
        producto.delete()
        return JsonResponse(f"Producto con id = {id}, borrado con exito", safe=False)

    elif request.method == "PUT":
        Producto.save(self=request.body )
        return JsonResponse(f"Producto añadido", safe=False)


#class verProductos(generic.ListView):
#   model = Producto
#   context_object_name = 'product_list'   # your own name for the list as a template variable
    #template_name = 'books/my_arbitrary_template_name_list.html'  # Specify your own template name/location
