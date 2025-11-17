from django.contrib import admin
from .models import (
    HeroSection, SiteSettings, NavigationItem, Service, CompanyStat,
    ProcessStep, Client, SocialLink, TrustIndicator, SectionHeader,
    FooterLinkGroup, ContactInquiry
)


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['headline', 'badge_text', 'created_at', 'updated_at']
    search_fields = ['headline', 'badge_text', 'subheading']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Основное содержание', {
            'fields': ('badge_text', 'headline', 'subheading')
        }),
        ('Кнопки действий', {
            'fields': (
                'primary_cta_text', 'primary_cta_url',
                'secondary_cta_text', 'secondary_cta_url'
            )
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'email', 'phone', 'updated_at']
    search_fields = ['company_name', 'email', 'phone']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Информация о компании', {
            'fields': ('company_name', 'company_tagline', 'company_description', 'logo_url')
        }),
        ('Контактная информация', {
            'fields': ('email', 'phone', 'address')
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(NavigationItem)
class NavigationItemAdmin(admin.ModelAdmin):
    list_display = ['label', 'href', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['label', 'href']
    ordering = ['order']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['title', 'description']
    ordering = ['order']

    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'description', 'icon', 'order')
        }),
        ('Особенности', {
            'fields': ('features',),
            'description': 'Введите список особенностей в формате JSON массива, например: ["Особенность 1", "Особенность 2"]'
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(CompanyStat)
class CompanyStatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['label', 'value', 'description']
    ordering = ['order']


@admin.register(ProcessStep)
class ProcessStepAdmin(admin.ModelAdmin):
    list_display = ['step_number', 'title', 'icon', 'created_at']
    list_editable = []
    search_fields = ['title', 'description']
    ordering = ['step_number']

    fieldsets = (
        ('Основная информация', {
            'fields': ('step_number', 'title', 'description', 'icon')
        }),
        ('Ключевые пункты', {
            'fields': ('points',),
            'description': 'Введите список пунктов в формате JSON массива, например: ["Пункт 1", "Пункт 2"]'
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'abbreviation', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['name', 'abbreviation', 'description']
    ordering = ['order']

    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'abbreviation', 'description', 'order')
        }),
        ('Ссылки', {
            'fields': ('logo_url', 'website')
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'icon', 'order']
    list_editable = ['order']
    search_fields = ['platform', 'url']
    ordering = ['order']


@admin.register(TrustIndicator)
class TrustIndicatorAdmin(admin.ModelAdmin):
    list_display = ['text', 'color', 'order', 'created_at']
    list_editable = ['order']
    list_filter = ['color']
    search_fields = ['text']
    ordering = ['order']


@admin.register(SectionHeader)
class SectionHeaderAdmin(admin.ModelAdmin):
    list_display = ['section_key', 'heading', 'badge_text', 'updated_at']
    list_filter = ['section_key']
    search_fields = ['heading', 'badge_text', 'subheading']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Секция', {
            'fields': ('section_key',)
        }),
        ('Содержание', {
            'fields': ('badge_text', 'heading', 'subheading')
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(FooterLinkGroup)
class FooterLinkGroupAdmin(admin.ModelAdmin):
    list_display = ['group_name', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['group_name']
    ordering = ['order']

    fieldsets = (
        ('Основная информация', {
            'fields': ('group_name', 'order')
        }),
        ('Ссылки', {
            'fields': ('links',),
            'description': 'Введите список ссылок в формате JSON, например: [{"label": "Услуги", "href": "#services"}]'
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    list_editable = ['is_read']

    fieldsets = (
        ('Контактная информация', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Детали обращения', {
            'fields': ('subject', 'message')
        }),
        ('Статус', {
            'fields': ('is_read',)
        }),
        ('Служебная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def has_add_permission(self, request):
        """Запретить создание обращений через админку (они создаются только через API)"""
        return False
