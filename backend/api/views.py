from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import AllowAny

from .models import (
    HeroSection, SiteSettings, NavigationItem, Service, CompanyStat,
    ProcessStep, Client, SocialLink, TrustIndicator, SectionHeader,
    FooterLinkGroup, ContactInquiry
)
from .serializers import (
    HeroSectionSerializer, SiteSettingsSerializer, NavigationItemSerializer,
    ServiceSerializer, CompanyStatSerializer, ProcessStepSerializer,
    ClientSerializer, SocialLinkSerializer, TrustIndicatorSerializer,
    SectionHeaderSerializer, FooterLinkGroupSerializer, ContactInquiryCreateSerializer
)


@api_view(['GET'])
def health_check(request):
    """
    Эндпоинт проверки здоровья API
    """
    return Response({
        'status': 'healthy',
        'message': 'API работает'
    }, status=status.HTTP_200_OK)


class HeroSectionView(RetrieveAPIView):
    """
    GET /api/hero-section/
    Возвращает содержимое главной секции (баннера) домашней страницы
    """
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        """Возвращает первый (и единственный) объект HeroSection"""
        return self.queryset.first()


class SiteSettingsView(RetrieveAPIView):
    """
    GET /api/site-settings/
    Возвращает общие настройки сайта
    """
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        """Возвращает первый (и единственный) объект SiteSettings"""
        return self.queryset.first()


class NavigationListView(ListAPIView):
    """
    GET /api/navigation/
    Возвращает элементы навигационного меню
    """
    queryset = NavigationItem.objects.all()
    serializer_class = NavigationItemSerializer
    permission_classes = [AllowAny]


class ServiceListView(ListAPIView):
    """
    GET /api/services/
    Возвращает список предлагаемых услуг
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class StatsListView(ListAPIView):
    """
    GET /api/stats/
    Возвращает статистику компании
    """
    queryset = CompanyStat.objects.all()
    serializer_class = CompanyStatSerializer
    permission_classes = [AllowAny]


class ProcessStepsListView(ListAPIView):
    """
    GET /api/process/
    Возвращает шаги рабочего процесса
    """
    queryset = ProcessStep.objects.all()
    serializer_class = ProcessStepSerializer
    permission_classes = [AllowAny]


class ClientsListView(ListAPIView):
    """
    GET /api/clients/
    Возвращает список клиентов/партнеров
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]


class SocialLinksListView(ListAPIView):
    """
    GET /api/social-links/
    Возвращает ссылки на социальные сети для футера
    """
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [AllowAny]


class TrustIndicatorsListView(ListAPIView):
    """
    GET /api/trust-indicators/
    Возвращает индикаторы доверия для отображения под секцией клиентов
    """
    queryset = TrustIndicator.objects.all()
    serializer_class = TrustIndicatorSerializer
    permission_classes = [AllowAny]


class SectionHeadersListView(ListAPIView):
    """
    GET /api/section-headers/
    Возвращает заголовки для различных секций страницы
    """
    queryset = SectionHeader.objects.all()
    serializer_class = SectionHeaderSerializer
    permission_classes = [AllowAny]


class FooterLinkGroupsListView(ListAPIView):
    """
    GET /api/footer-links/
    Возвращает группы ссылок для футера
    """
    queryset = FooterLinkGroup.objects.all()
    serializer_class = FooterLinkGroupSerializer
    permission_classes = [AllowAny]


class ContactInquiryCreateView(CreateAPIView):
    """
    POST /api/contact/
    Принимает отправку формы контактов
    """
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquiryCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response({
            'success': True,
            'message': 'Ваше обращение получено. Мы свяжемся с вами в ближайшее время!'
        }, status=status.HTTP_201_CREATED)
