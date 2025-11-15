# API Integration Setup Guide

This guide will help you complete the frontend-to-backend API integration for WebStudio.

## What Was Implemented

### Backend Changes

1. **Django Models** (`backend/api/models.py`)
   - `Service` - Store service offerings (SEO, Software Dev, AI/LLM)
   - `CompanyStat` - Store company statistics and achievements
   - `ProcessStep` - Store work process steps
   - `Client` - Store client/portfolio information
   - `ContactInquiry` - Store contact form submissions

2. **DRF Serializers** (`backend/api/serializers.py`)
   - Serializers for all models with validation

3. **API Views** (`backend/api/views.py`)
   - `ServiceViewSet` - GET `/api/services/`
   - `CompanyStatViewSet` - GET `/api/stats/`
   - `ProcessStepViewSet` - GET `/api/process/`
   - `ClientViewSet` - GET `/api/clients/`
   - `ContactInquiryViewSet` - GET/POST `/api/contact/`

4. **Django Admin** (`backend/api/admin.py`)
   - Admin panels for managing all content

5. **Management Command** (`backend/api/management/commands/populate_initial_data.py`)
   - Command to populate database with initial hardcoded data

### Frontend Changes

1. **API Utilities** (`frontend/lib/api.ts`)
   - TypeScript interfaces for all data types
   - Fetch functions for all endpoints
   - Centralized API configuration

2. **Updated Components**
   - `ServicesBlock.tsx` - Fetches services from API
   - `AboutUs.tsx` - Fetches company stats from API
   - `WorkProcess.tsx` - Fetches process steps from API
   - `ClientsGallery.tsx` - Fetches clients from API
   - `HeroSection.tsx` - Fetches stats from API

## Setup Steps

### 1. Run Database Migrations

First, create and apply the database migrations:

```bash
make makemigrations
make migrate
```

Or manually:

```bash
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

### 2. Populate Initial Data

Run the management command to populate the database with initial data:

```bash
docker compose exec backend python manage.py populate_initial_data
```

This will create:
- 3 services (SEO, Software Development, AI/LLM)
- 6 company statistics
- 4 process steps
- 8 client entries

### 3. Verify API Endpoints

Test the API endpoints to ensure they're working:

```bash
# Health check
curl http://localhost/api/health/

# Services
curl http://localhost/api/services/

# Stats
curl http://localhost/api/stats/

# Process steps
curl http://localhost/api/process/

# Clients
curl http://localhost/api/clients/
```

### 4. Create Superuser (Optional)

To access the Django admin panel and manage content:

```bash
make createsuperuser
```

Or manually:

```bash
docker compose exec backend python manage.py createsuperuser
```

Then visit `http://localhost/admin/` to manage all content.

### 5. Configure API URL (if needed)

If your backend is not at `/api`, set the environment variable:

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-api-domain/api
```

### 6. Restart Services

Restart all services to ensure everything is loaded:

```bash
make restart
```

Or:

```bash
docker compose restart
```

### 7. Test the Frontend

Visit `http://localhost` and verify:
- Services section displays 3 services from API
- Hero section shows stats from API
- About section shows company stats
- Process section shows 4 steps
- Clients gallery shows 8 clients

## API Endpoints Reference

### Services
- **GET** `/api/services/` - List all active services
- **GET** `/api/services/{id}/` - Get single service

### Company Stats
- **GET** `/api/stats/` - List all active stats
- **GET** `/api/stats/{id}/` - Get single stat

### Process Steps
- **GET** `/api/process/` - List all active process steps
- **GET** `/api/process/{id}/` - Get single process step

### Clients
- **GET** `/api/clients/` - List all active clients
- **GET** `/api/clients/{id}/` - Get single client

### Contact Inquiries
- **GET** `/api/contact/` - List all inquiries (authenticated only)
- **POST** `/api/contact/` - Submit new inquiry
- **GET** `/api/contact/{id}/` - Get single inquiry

## Managing Content

### Via Django Admin

1. Go to `http://localhost/admin/`
2. Login with superuser credentials
3. Navigate to API section
4. Manage Services, Stats, Process Steps, Clients, and Contact Inquiries

### Via API (for future development)

All endpoints support standard REST operations:
- List: GET `/api/{resource}/`
- Retrieve: GET `/api/{resource}/{id}/`
- Create: POST `/api/{resource}/`
- Update: PUT/PATCH `/api/{resource}/{id}/`
- Delete: DELETE `/api/{resource}/{id}/`

Note: Currently, most endpoints are read-only for public users. POST is only enabled for Contact Inquiries.

## Troubleshooting

### Frontend shows "Loading..." forever

1. Check if backend is running: `docker compose ps`
2. Check backend logs: `make logs-backend`
3. Verify API endpoints are accessible: `curl http://localhost/api/health/`
4. Check browser console for CORS errors

### CORS Errors

If you see CORS errors in browser console:

1. Verify CORS settings in `backend/config/settings.py`
2. Ensure your frontend origin is in `CORS_ALLOWED_ORIGINS`
3. Restart backend: `docker compose restart backend`

### Database Errors

If migrations fail:

1. Check database is running: `docker compose ps db`
2. Check database logs: `docker compose logs db`
3. Verify `POSTGRES_HOST=db` in docker-compose.yml

### No Data Showing

If API returns empty arrays:

1. Run the populate command again: `docker compose exec backend python manage.py populate_initial_data`
2. Verify data exists: `docker compose exec db psql -U postgres -d webstudio -c "SELECT COUNT(*) FROM api_service;"`
3. Check if `is_active=True` on records

## Next Steps

### Add Contact Form

The backend is ready for contact form submissions. Create a contact form component:

```typescript
import { submitContactInquiry } from '@/lib/api';

async function handleSubmit(data: ContactInquiry) {
  await submitContactInquiry(data);
}
```

### Add Admin Authentication

Currently, the admin panel uses Django's default authentication. Consider:
- Setting up proper admin credentials
- Restricting admin access by IP
- Enabling two-factor authentication

### Production Deployment

Before deploying to production:

1. Change `SECRET_KEY` in `.env`
2. Set `DEBUG=False`
3. Configure proper `ALLOWED_HOSTS`
4. Set up proper database backups
5. Use environment-specific CORS origins
6. Enable HTTPS/SSL

## File Structure

```
web_studio/
├── backend/
│   └── api/
│       ├── models.py              # Django models
│       ├── serializers.py         # DRF serializers
│       ├── views.py               # API views
│       ├── urls.py                # API routes
│       ├── admin.py               # Django admin config
│       └── management/
│           └── commands/
│               └── populate_initial_data.py
└── frontend/
    ├── lib/
    │   └── api.ts                 # API utility functions
    └── components/
        ├── HeroSection.tsx        # ✓ Integrated
        ├── ServicesBlock.tsx      # ✓ Integrated
        ├── AboutUs.tsx            # ✓ Integrated
        ├── WorkProcess.tsx        # ✓ Integrated
        └── ClientsGallery.tsx     # ✓ Integrated
```

## Support

If you encounter any issues:
1. Check the logs: `make logs`
2. Verify all services are running: `docker compose ps`
3. Review this guide for missed steps
4. Check the CLAUDE.md file for architecture details
