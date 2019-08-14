from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('tickets', views.TicketView)
router.register('menus', views.MenuView)

urlpatterns = [
    path('', include(router.urls))
]