# WebStudio API Specification

This document describes all API endpoints required for the WebStudio frontend. All endpoints should return JSON and support CORS.

## Base URL

```
/api
```

## Authentication

Currently, no authentication is required for GET endpoints. POST endpoints may require CSRF protection.

---

## Endpoints

### 1. Hero Section

**Endpoint:** `GET /api/hero-section/`

**Description:** Returns content for the hero section (main banner) of the homepage.

**Response:**
```json
{
  "id": 1,
  "badge_text": "Цифровые решения для современного бизнеса",
  "headline": "Трансформируйте свой бизнес с помощью передовых цифровых решений",
  "subheading": "Мы специализируемся на SEO и цифровом маркетинге, разработке программного обеспечения на заказ и интеграции искусственного интеллекта/LLM, чтобы помочь малому и среднему бизнесу в регионе СНГ достичь своих целей цифровой трансформации.",
  "primary_cta_text": "Start Your Project",
  "primary_cta_url": "#contact",
  "secondary_cta_text": "View Our Work",
  "secondary_cta_url": "#cases",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

**Django Model:**
```python
class HeroSection(models.Model):
    badge_text = models.CharField(max_length=200)
    headline = models.TextField()
    subheading = models.TextField()
    primary_cta_text = models.CharField(max_length=100)
    primary_cta_url = models.CharField(max_length=500)
    secondary_cta_text = models.CharField(max_length=100)
    secondary_cta_url = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

### 2. Site Settings

**Endpoint:** `GET /api/site-settings/`

**Description:** Returns general site settings (company name, logo, contact info, etc.)

**Response:**
```json
{
  "id": 1,
  "company_name": "WebStudio",
  "company_tagline": "Transforming businesses through innovative digital solutions",
  "company_description": "Transforming businesses through innovative digital solutions. Your trusted partner in the CIS region.",
  "logo_url": "",
  "email": "info@webstudio.com",
  "phone": "+1 (234) 567-890",
  "address": "Moscow, Russia",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

**Django Model:**
```python
class SiteSettings(models.Model):
    company_name = models.CharField(max_length=200)
    company_tagline = models.CharField(max_length=500)
    company_description = models.TextField()
    logo_url = models.URLField(blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

### 3. Navigation Menu

**Endpoint:** `GET /api/navigation/`

**Description:** Returns navigation menu items for header.

**Response:**
```json
[
  {
    "id": 1,
    "label": "Services",
    "href": "#services",
    "order": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "label": "About",
    "href": "#about",
    "order": 2,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Django Model:**
```python
class NavigationItem(models.Model):
    label = models.CharField(max_length=100)
    href = models.CharField(max_length=500)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
```

---

### 4. Services

**Endpoint:** `GET /api/services/`

**Description:** Returns list of services offered.

**Response:**
```json
[
  {
    "id": 1,
    "title": "SEO & Digital Marketing",
    "description": "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    "icon": "Search",
    "features": [
      "Keyword research and optimization",
      "On-page and technical SEO",
      "Content marketing strategy",
      "Link building campaigns"
    ],
    "order": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Icon Values:** `Search`, `Code`, `Brain` (these correspond to Lucide icons on the frontend)

**Django Model:**
```python
class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)  # Icon name
    features = models.JSONField()  # Array of strings
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
```

---

### 5. Company Stats

**Endpoint:** `GET /api/stats/`

**Description:** Returns company statistics (projects completed, clients, years, etc.)

**Response:**
```json
[
  {
    "id": 1,
    "label": "Projects Completed",
    "value": "50+",
    "description": "Successful Projects",
    "order": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Django Model:**
```python
class CompanyStat(models.Model):
    label = models.CharField(max_length=200)
    value = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
```

---

### 6. Process Steps

**Endpoint:** `GET /api/process/`

**Description:** Returns work process steps.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Discovery",
    "description": "Understanding your business goals and requirements",
    "icon": "FileSearch",
    "points": [
      "Initial consultation",
      "Requirements gathering",
      "Competitive analysis"
    ],
    "step_number": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Icon Values:** `FileSearch`, `Lightbulb`, `Code2`, `Rocket`, `Search`, `FileText`

**Django Model:**
```python
class ProcessStep(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    points = models.JSONField()  # Array of strings
    step_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['step_number']
```

---

### 7. Clients

**Endpoint:** `GET /api/clients/`

**Description:** Returns list of clients/partners.

**Response:**
```json
[
  {
    "id": 1,
    "name": "TechCorp Inc.",
    "abbreviation": "TC",
    "logo_url": "",
    "website": "",
    "description": "Leading technology company",
    "order": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Django Model:**
```python
class Client(models.Model):
    name = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length=10)
    logo_url = models.URLField(blank=True)
    website = models.URLField(blank=True)
    description = models.TextField()
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
```

---

### 8. Social Links

**Endpoint:** `GET /api/social-links/`

**Description:** Returns social media links for footer.

**Response:**
```json
[
  {
    "id": 1,
    "platform": "Facebook",
    "url": "https://facebook.com",
    "icon": "Facebook",
    "order": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Icon Values:** `Facebook`, `Twitter`, `Linkedin`, `Github`

**Django Model:**
```python
class SocialLink(models.Model):
    platform = models.CharField(max_length=100)
    url = models.URLField()
    icon = models.CharField(max_length=50)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
```

---

### 9. Trust Indicators

**Endpoint:** `GET /api/trust-indicators/`

**Description:** Returns trust indicators displayed under clients section.

**Response:**
```json
[
  {
    "id": 1,
    "text": "100% Money Back Guarantee",
    "color": "green",
    "order": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Color Values:** `green`, `blue`, `purple`, `red`, `yellow`

**Django Model:**
```python
class TrustIndicator(models.Model):
    text = models.CharField(max_length=200)
    color = models.CharField(max_length=50)  # Color name
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
```

---

### 10. Section Headers

**Endpoint:** `GET /api/section-headers/`

**Description:** Returns headers for different page sections (badge, heading, subheading).

**Response:**
```json
[
  {
    "id": 1,
    "section_key": "services",
    "badge_text": "Our Services",
    "heading": "Complete Digital Solutions for Your Business",
    "subheading": "From strategy to implementation, we provide end-to-end digital services to help you succeed in the modern marketplace.",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Section Keys:** `services`, `about`, `process`, `clients`

**Django Model:**
```python
class SectionHeader(models.Model):
    SECTION_CHOICES = [
        ('services', 'Services'),
        ('about', 'About'),
        ('process', 'Process'),
        ('clients', 'Clients'),
    ]

    section_key = models.CharField(max_length=50, choices=SECTION_CHOICES, unique=True)
    badge_text = models.CharField(max_length=200)
    heading = models.CharField(max_length=500)
    subheading = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

### 11. Footer Link Groups

**Endpoint:** `GET /api/footer-links/`

**Description:** Returns grouped links for footer.

**Response:**
```json
[
  {
    "id": 1,
    "group_name": "Quick Links",
    "links": [
      {
        "label": "Services",
        "href": "#services"
      },
      {
        "label": "About Us",
        "href": "#about"
      }
    ],
    "order": 1,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
```

**Django Model:**
```python
class FooterLinkGroup(models.Model):
    group_name = models.CharField(max_length=200)
    links = models.JSONField()  # Array of {label, href} objects
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
```

---

### 12. Contact Form Submission

**Endpoint:** `POST /api/contact/`

**Description:** Accepts contact form submissions.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your inquiry has been received. We'll get back to you soon!"
}
```

**Django Model:**
```python
class ContactInquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=500)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
```

---

## Implementation Notes

### Django Admin

All models should be registered in Django admin with appropriate `list_display`, `list_filter`, and `search_fields` to make content management easy.

Example admin configuration:
```python
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['title', 'description']
    ordering = ['order']
```

### Serializers (Django REST Framework)

Use ModelSerializer for all endpoints:

```python
from rest_framework import serializers

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
```

### Views

Use `ListAPIView` for list endpoints and `RetrieveAPIView` for single object endpoints:

```python
from rest_framework.generics import ListAPIView

class ServiceListView(ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
```

### CORS

Ensure CORS is properly configured in `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://frontend:3000",
    "http://localhost",
]
```

### URL Configuration

```python
from django.urls import path
from . import views

urlpatterns = [
    path('hero-section/', views.HeroSectionView.as_view()),
    path('site-settings/', views.SiteSettingsView.as_view()),
    path('navigation/', views.NavigationListView.as_view()),
    path('services/', views.ServiceListView.as_view()),
    path('stats/', views.StatsListView.as_view()),
    path('process/', views.ProcessStepsListView.as_view()),
    path('clients/', views.ClientsListView.as_view()),
    path('social-links/', views.SocialLinksListView.as_view()),
    path('trust-indicators/', views.TrustIndicatorsListView.as_view()),
    path('section-headers/', views.SectionHeadersListView.as_view()),
    path('footer-links/', views.FooterLinkGroupsListView.as_view()),
    path('contact/', views.ContactInquiryCreateView.as_view()),
]
```

## Testing

Once the API is implemented, change the frontend environment variable:

```bash
# In frontend/.env.local
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=/api
```

This will switch the frontend from using mock data to real API calls.
