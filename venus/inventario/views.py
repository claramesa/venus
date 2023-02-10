from django.http import JsonResponse
from django.http import HttpResponse
from .models import Producto
from django.core.serializers import serialize


def members(request):
    return HttpResponse("Hello world!")


def verProductos(request):
    '''Devolvemos json con todos los productos'''
    if request.method == "GET":
        if request.body is None:
            productos = serialize('json', Producto.objects.all())
            return JsonResponse(productos, safe=False)
        else:
            producto = serialize('json', Producto.objects.filter(id__icontains=request.body))
            return JsonResponse(producto, safe=False)

def productoId(request, id):
    '''Modificamos o devolvemos un producto por su Id'''
    if request.method == "GET":
        producto = serialize('json', Producto.objects.filter(id__icontains=id))
        return JsonResponse(producto, safe=False)
    elif request.method == "DELETE":
        producto = serialize('json', Producto.objects.filter(id_icontains=id).delete())
        return JsonResponse(producto, safe=False)


#class verProductos(generic.ListView):
#   model = Producto
#   context_object_name = 'product_list'   # your own name for the list as a template variable
    #template_name = 'books/my_arbitrary_template_name_list.html'  # Specify your own template name/location
