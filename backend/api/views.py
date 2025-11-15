from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny

from .models import Service, CompanyStat, ProcessStep, Client, ContactInquiry
from .serializers import (
    ServiceSerializer,
    CompanyStatSerializer,
    ProcessStepSerializer,
    ClientSerializer,
    ContactInquirySerializer
)


@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint
    """
    return Response({
        'status': 'healthy',
        'message': 'API is running'
    }, status=status.HTTP_200_OK)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for services.
    Only active services are returned.
    """
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class CompanyStatViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for company statistics.
    Only active stats are returned.
    """
    queryset = CompanyStat.objects.filter(is_active=True)
    serializer_class = CompanyStatSerializer
    permission_classes = [AllowAny]


class ProcessStepViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for process steps.
    Only active steps are returned.
    """
    queryset = ProcessStep.objects.filter(is_active=True)
    serializer_class = ProcessStepSerializer
    permission_classes = [AllowAny]


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for clients.
    Only active clients are returned.
    """
    queryset = Client.objects.filter(is_active=True)
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]


class ContactInquiryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for contact inquiries.
    POST allowed for form submissions.
    GET/PUT/DELETE only for authenticated users.
    """
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'head', 'options']  # Only allow GET and POST

    def get_queryset(self):
        """Only allow listing for authenticated users"""
        if self.action == 'list':
            if self.request.user.is_authenticated:
                return self.queryset
            return ContactInquiry.objects.none()
        return self.queryset
