from django.http import JsonResponse
from django.http import HttpResponse
from .models import Producto
from django.core.serializers import serialize


def members(request):
    return HttpResponse("Hello world!")


def verProductos(request):
    '''Devolvemos json con todos los productos'''
    if request.method == "GET":
        productos = serialize('json', Producto.objects.all())
        return JsonResponse(productos, safe=False)




#class verProductos(generic.ListView):
#   model = Producto
#   context_object_name = 'product_list'   # your own name for the list as a template variable
    #template_name = 'books/my_arbitrary_template_name_list.html'  # Specify your own template name/location
