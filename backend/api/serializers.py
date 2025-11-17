from rest_framework import serializers
from .models import (
    HeroSection, SiteSettings, NavigationItem, Service, CompanyStat,
    ProcessStep, Client, SocialLink, TrustIndicator, SectionHeader,
    FooterLinkGroup, ContactInquiry
)


class HeroSectionSerializer(serializers.ModelSerializer):
    """Сериализатор главной секции"""

    class Meta:
        model = HeroSection
        fields = [
            'id', 'badge_text', 'headline', 'subheading',
            'primary_cta_text', 'primary_cta_url',
            'secondary_cta_text', 'secondary_cta_url',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Сериализатор настроек сайта"""

    class Meta:
        model = SiteSettings
        fields = [
            'id', 'company_name', 'company_tagline', 'company_description',
            'logo_url', 'email', 'phone', 'address',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class NavigationItemSerializer(serializers.ModelSerializer):
    """Сериализатор элементов навигации"""

    class Meta:
        model = NavigationItem
        fields = ['id', 'label', 'href', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ServiceSerializer(serializers.ModelSerializer):
    """Сериализатор услуг"""

    class Meta:
        model = Service
        fields = [
            'id', 'title', 'description', 'icon', 'features', 'order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CompanyStatSerializer(serializers.ModelSerializer):
    """Сериализатор статистики компании"""

    class Meta:
        model = CompanyStat
        fields = [
            'id', 'label', 'value', 'description', 'order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ProcessStepSerializer(serializers.ModelSerializer):
    """Сериализатор шагов процесса"""

    class Meta:
        model = ProcessStep
        fields = [
            'id', 'title', 'description', 'icon', 'points', 'step_number',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ClientSerializer(serializers.ModelSerializer):
    """Сериализатор клиентов"""

    class Meta:
        model = Client
        fields = [
            'id', 'name', 'abbreviation', 'logo_url', 'website',
            'description', 'order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class SocialLinkSerializer(serializers.ModelSerializer):
    """Сериализатор ссылок на социальные сети"""

    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'url', 'icon', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class TrustIndicatorSerializer(serializers.ModelSerializer):
    """Сериализатор индикаторов доверия"""

    class Meta:
        model = TrustIndicator
        fields = ['id', 'text', 'color', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class SectionHeaderSerializer(serializers.ModelSerializer):
    """Сериализатор заголовков секций"""

    class Meta:
        model = SectionHeader
        fields = [
            'id', 'section_key', 'badge_text', 'heading', 'subheading',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class FooterLinkGroupSerializer(serializers.ModelSerializer):
    """Сериализатор групп ссылок в футере"""

    class Meta:
        model = FooterLinkGroup
        fields = ['id', 'group_name', 'links', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ContactInquirySerializer(serializers.ModelSerializer):
    """Сериализатор обращений через форму контактов"""

    class Meta:
        model = ContactInquiry
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_email(self, value):
        """Валидация формата email"""
        if not value:
            raise serializers.ValidationError("Email обязателен для заполнения")
        return value.lower()

    def validate_message(self, value):
        """Валидация длины сообщения"""
        if len(value) < 10:
            raise serializers.ValidationError("Сообщение должно содержать минимум 10 символов")
        return value


class ContactInquiryCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания обращений (для POST запросов)"""

    class Meta:
        model = ContactInquiry
        fields = ['name', 'email', 'phone', 'subject', 'message']

    def validate_email(self, value):
        """Валидация формата email"""
        if not value:
            raise serializers.ValidationError("Email обязателен для заполнения")
        return value.lower()

    def validate_message(self, value):
        """Валидация длины сообщения"""
        if len(value) < 10:
            raise serializers.ValidationError("Сообщение должно содержать минимум 10 символов")
        return value
