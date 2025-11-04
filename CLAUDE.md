# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

WebStudio is a fullstack web development platform with a containerized microservices architecture:

- **Backend (Django)**: RESTful API using Django REST Framework, served by Gunicorn
- **Frontend (Next.js 14)**: React application using App Router and TypeScript
- **Database**: PostgreSQL 16
- **Reverse Proxy**: Nginx routes traffic between frontend and backend services

### Service Communication

- Nginx (port 80) acts as the single entry point
- Frontend requests to `/api/*` and `/admin/*` are proxied to the Django backend
- All other requests go to the Next.js frontend
- Backend and frontend communicate within Docker network using service names (`backend:8000`, `frontend:3000`)

### Environment Configuration

All services are configured via environment variables in `.env`. The backend uses `python-decouple` for configuration management. Key settings:
- `DEBUG`: Controls Django debug mode
- `SECRET_KEY`: Django secret (must be changed for production)
- `POSTGRES_*`: Database connection parameters
- `POSTGRES_HOST`: Must be set to `db` (matches the Docker service name in docker-compose.yml)

## Development Commands

All development is done through Docker Compose v2 (`docker compose` with space, not `docker-compose` with hyphen). Use Makefile commands for convenience:

### Starting/Stopping Services
```bash
make up          # Start all services (attached, shows logs)
make up-d        # Start all services (detached)
make down        # Stop all services
make restart     # Restart all services
make build       # Rebuild Docker containers
```

### Viewing Logs
```bash
make logs              # All services
make logs-backend      # Backend only
make logs-frontend     # Frontend only
```

### Container Access
```bash
make exec              # Backend shell (bash)
make exec-frontend     # Frontend shell (sh)
make exec-db          # PostgreSQL prompt
```

### Django Management
```bash
make migrate           # Run migrations
make makemigrations    # Create migrations
make createsuperuser   # Create admin user
make shell            # Django shell
make collectstatic     # Collect static files
```

### Cleanup
```bash
make clean    # Stop containers and remove volumes (WARNING: deletes database data)
```

## Backend Development

### Adding Django Apps
1. Create app inside `backend/` directory
2. Add to `INSTALLED_APPS` in `backend/config/settings.py`
3. Include URL patterns in `backend/config/urls.py`
4. Run migrations if models are added

### Adding Python Dependencies
1. Add package to `backend/requirements.txt`
2. Rebuild backend container: `docker compose up --build backend`

### Database Migrations
The backend auto-runs migrations on startup via docker compose command. For manual control:
```bash
make makemigrations    # After model changes
make migrate          # Apply migrations
```

### API Endpoints
All API endpoints are prefixed with `/api/` and configured in `backend/api/urls.py`. Current endpoints:
- `/api/health/` - Health check endpoint

## Frontend Development

### Adding NPM Dependencies
```bash
# Inside container
docker compose exec frontend npm install <package>

# Or add to package.json and rebuild
docker compose up --build frontend
```

### Running Frontend Commands
```bash
docker compose exec frontend npm run <command>
```

Available scripts (from `frontend/package.json`):
- `dev` - Development server (default)
- `build` - Production build
- `start` - Start production server
- `lint` - Next.js linting

### Frontend Structure
- `frontend/app/` - Next.js App Router pages and layouts
- `frontend/components/` - Reusable React components
- Uses TypeScript, Tailwind CSS, and PostCSS

## CORS Configuration

CORS is configured in `backend/config/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",    # Direct frontend access
    "http://frontend:3000",     # Docker network
    "http://localhost",         # Nginx proxy
]
```

When adding new origins, update this list and restart the backend.

## Important Notes

- **Hot Reload**: Both frontend and backend support hot reload in development mode
- **Service Dependencies**: Backend waits for database health check before starting
- **Static Files**: Django static files are collected to `staticfiles/` volume and served by Nginx at `/static`
- **Database Persistence**: PostgreSQL data is stored in Docker volume `postgres_data`
- **Environment Variables**: Backend inherits from docker-compose which reads from `.env` file

## Common Issues

**Port conflicts**: Default ports are 8080 (nginx), 3000 (frontend), 8000 (backend), 5432 (postgres). Change in `docker-compose.yml` if needed.

**Database connection errors**: Ensure `POSTGRES_HOST=db` in docker-compose.yml matches the database service name.

**Frontend can't reach backend**: Check that backend service is healthy and CORS origins include the request origin.
