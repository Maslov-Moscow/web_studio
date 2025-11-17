from django.urls import path
from . import views

urlpatterns = [
    # Health check endpoint
    path('health/', views.health_check, name='health-check'),

    # Content endpoints
    path('hero-section/', views.HeroSectionView.as_view(), name='hero-section'),
    path('site-settings/', views.SiteSettingsView.as_view(), name='site-settings'),
    path('navigation/', views.NavigationListView.as_view(), name='navigation'),
    path('services/', views.ServiceListView.as_view(), name='services'),
    path('stats/', views.StatsListView.as_view(), name='stats'),
    path('process/', views.ProcessStepsListView.as_view(), name='process'),
    path('clients/', views.ClientsListView.as_view(), name='clients'),
    path('social-links/', views.SocialLinksListView.as_view(), name='social-links'),
    path('trust-indicators/', views.TrustIndicatorsListView.as_view(), name='trust-indicators'),
    path('section-headers/', views.SectionHeadersListView.as_view(), name='section-headers'),
    path('footer-links/', views.FooterLinkGroupsListView.as_view(), name='footer-links'),

    # Contact form endpoint
    path('contact/', views.ContactInquiryCreateView.as_view(), name='contact'),
]
