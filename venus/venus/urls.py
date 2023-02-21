"""venus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from inventario import views as vInv
from empleados import views as vEmp


urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('productos/', vInv.ProductoManagement.as_view()),
    path('producto/<int:id>', vInv.ProductoManagementId.as_view()),
    path('empleados/', vEmp.EmpleadoManagement.as_view()),
    path('empleado/<int:id>', vEmp.EmpleadoManagementId.as_view()),
    path('categorias/', vInv.ProductoManagement.as_view()),
    path('categoria/<int:id>', vInv.ProductoManagementId.as_view())
]
