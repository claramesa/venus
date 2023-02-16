from django.http import JsonResponse
from django.http import HttpResponse
from .models import Producto
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt


def members(request):
    return HttpResponse("Hello world!" + str(request.headers))

@csrf_exempt
def verProductos(request):
    '''Devolvemos json con todos los productos'''
    if request.method == "GET":
        productos = serialize('json', Producto.objects.all())
        return JsonResponse(productos, safe=False)
    
    elif request.method == "DELETE":
        '''Método para borrar todos los productos'''
        Producto.objects.all().delete()
        return JsonResponse("Todos los productos borrados", safe=False)

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
        Producto.save(update_fields=["categoria", "nombre", "precio", "stock", "descripcion"])


#class verProductos(generic.ListView):
#   model = Producto
#   context_object_name = 'product_list'   # your own name for the list as a template variable
    #template_name = 'books/my_arbitrary_template_name_list.html'  # Specify your own template name/location
