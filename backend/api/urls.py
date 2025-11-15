from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'services', views.ServiceViewSet, basename='service')
router.register(r'stats', views.CompanyStatViewSet, basename='companystat')
router.register(r'process', views.ProcessStepViewSet, basename='processstep')
router.register(r'clients', views.ClientViewSet, basename='client')
router.register(r'contact', views.ContactInquiryViewSet, basename='contact')

urlpatterns = [
    path('health/', views.health_check, name='health-check'),
    path('', include(router.urls)),
]
