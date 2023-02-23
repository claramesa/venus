"""Vistas para Productos y Categorias

    Autors: Roberto Ruiz
            Adán Agirre
            Maria José Valverde

    Date: 21/02/2023
"""
from .models import Producto, Categoria
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict

class ProductoManagement(APIView):
    """Clase donde estan las funciones simples
    """
    def get(self, request):
        """Funcion para obtener todos los productos

        Args:
            request

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        productos = Producto.objects.all().values()
        return Response(productos, 200)
    
    def post(self, request):
        """Funcion para insertar nuevo producto

        Args:
            request

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
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
        return Response(model_to_dict(productoNuevo), 201)



class ProductoManagementId(APIView):
    """Clase donde se alojan las funciones que necesitan id
    """
    def get(self, request, id):
        """Funcion para obtener un producto por id

        Args:
            request
            id (num): Id del producto

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            producto = model_to_dict(Producto.objects.get(id__icontains=id))
        except Exception:
            return Response({"error": f"ERROR - PROD {id}"}, 404)
        return Response(model_to_dict(producto), 201)
    
    def delete(self, request, id):
        """Funcion para eliminar un producto por id

        Args:
            request
            id (num): Id del producto

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            productoBorrar = Producto.objects.get(id__icontains=id)
        except Exception:
            return Response({"error": f"ERROR - PROD {id}"}, 404)
        
        try:
            productoBorrar.delete() 
        except Exception:
            return Response({"error": f"ERROR DE BORRADO - PROD {id}"}, 500)
        
        return Response(model_to_dict(productoBorrar), 201)
    
    def put(self, request, id):
        """Funcion para modificar un producto por id

        Args:
            request
            id (num): Id del producto

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            productoModificado = Producto.objects.get(id__icontains=id)
            productoModificado.categoria = Categoria.objects.get(pk=request.data['categoria']) 
            productoModificado.nombre = request.data['nombre']
            productoModificado.descripcion = request.data['descripcion']
            productoModificado.precio = request.data['precio']
            productoModificado.stock = request.data['stock']
            productoModificado.save()
        except Exception as e:
            return Response({'error': 'ERROR DE MODIFY: ' + e}, 500)
        return Response(model_to_dict(productoModificado), 201)
    
class CategoriaManagement(APIView):
    def get(self, request):
        """Funcion para obtener todas las categorias

        Args:
            request

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        categorias = Categoria.objects.all().values()
        return Response(categorias, 200)
    
    def post(self, request):
        """Funcion para crear una nueva categoria

        Args:
            request

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            categoriaNuevo = Categoria()
            categoriaNuevo.nombre = request.data['nombre']
            categoriaNuevo.save()
        except Exception as e:
            print(e)
            return Response({"error": e}, 500)
        return Response(model_to_dict(categoriaNuevo), 201)



class CategoriaManagementId(APIView):
    def get(self, request, id):
        """Funcion para obtener una categoria por id

        Args:
            request
            id (num): Id del producto

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            categoria = model_to_dict(Categoria.objects.get(id__icontains=id))
        except Exception:
            return Response({"error": f"ERROR - CAT {id}"}, 404)
        return Response(categoria, 201)
    
    def delete(self, request, id):
        """Funcion para eliminar una categoria por id

        Args:
            request
            id (num): Id del producto

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            categoriaBorrar = Categoria.objects.get(id__icontains=id)
        except Exception:
            return Response({"error": f"ERROR - CAT {id}"}, 404)
        
        try:
            categoriaBorrar.delete() 
        except Exception:
            return Response({"error": f"ERROR DE BORRADO - CAT {id}"}, 500)
        
        return Response(model_to_dict(categoriaBorrar), 201)
    
    def put(self, request, id):
        """Funcion para modificar una categoria por id

        Args:
            request
            id (num): Id del producto

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            categoriaModificado = Categoria.objects.get(id__icontains=id)
            categoriaModificado.nombre = request.data['nombre']
            categoriaModificado.save()
        except Exception as e:
            return Response({'error': 'ERROR DE MODIFY'}, 500)
        return Response(model_to_dict(categoriaModificado), 201)


class ProductoManagementCategoria(APIView):
    def get(self, request, id):
        """Funcion para buscar prodcutos por categoría

        Args:
            request
            id (num): Id de categoría

        Returns:
            Response: Codigo de como ha resultado el metodo
        """
        try:
            productosPorCategoria = Producto.objects.filter(categoria=id).values()
        except Exception as e:
            return Response({'error': f'ERROR DE BUSQUEDA {e}'}, 500)
        return Response(productosPorCategoria, 201)