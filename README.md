# WebStudio - Fullstack Web Development Platform

Modern fullstack web application built with Django (backend) and Next.js (frontend), containerized with Docker.

## Tech Stack

### Backend
- **Django 5.0+** - Web framework
- **Django REST Framework** - RESTful API
- **PostgreSQL** - Database
- **Gunicorn** - WSGI server

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy
- **PostgreSQL 16** - Database

## Project Structure

```
webstudio/
├── backend/              # Django backend
│   ├── config/          # Django settings and configuration
│   ├── api/             # REST API application
│   ├── requirements.txt # Python dependencies
│   ├── manage.py        # Django management script
│   └── Dockerfile       # Backend container
├── frontend/            # Next.js frontend
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── package.json    # Node dependencies
│   └── Dockerfile      # Frontend container
├── nginx/              # Nginx configuration
│   └── nginx.conf      # Reverse proxy settings
├── docker-compose.yml  # Docker orchestration
├── .env.example        # Environment variables template
└── README.md          # This file
```

## Quick Start

### Prerequisites
- Docker
- Docker Compose

### Installation

1. Clone the repository and navigate to the project directory:
```bash
cd webstudio
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start all services:
```bash
make up
# or with docker compose directly
docker compose up
```

That's it! The application will be available at:
- **Main application**: http://localhost:8080
- **Frontend (direct)**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin

### First Time Setup

After starting the services, create a Django superuser:
```bash
make createsuperuser
```

## Makefile Commands

For convenience, common commands are available via Makefile:

```bash
make help              # Show all available commands
make build             # Build all Docker containers
make up                # Start all services (attached mode)
make up-d              # Start all services (detached mode)
make down              # Stop all services
make restart           # Restart all services
make logs              # View logs from all services
make logs-backend      # View backend logs only
make logs-frontend     # View frontend logs only
```

**Container Access:**
```bash
make exec              # Enter backend container shell
make exec-frontend     # Enter frontend container shell
make exec-db           # Enter PostgreSQL database
```

**Django Management:**
```bash
make migrate           # Run database migrations
make makemigrations    # Create new migrations
make createsuperuser   # Create Django superuser
make shell             # Open Django shell
make collectstatic     # Collect static files
```

**Cleanup:**
```bash
make clean             # Stop and remove all containers and volumes
```

## Development

### Hot Reload
Both frontend and backend support hot-reload in development mode:
- Frontend: Changes to files in `frontend/` will automatically refresh
- Backend: Gunicorn runs with `--reload` flag for automatic restarts

### Accessing Services

**Backend Shell:**
```bash
make exec
# or
make shell  # Django shell
```

**Database:**
```bash
make exec-db
```

**View Logs:**
```bash
make logs              # All services
make logs-backend      # Backend only
make logs-frontend     # Frontend only
```

### Managing Dependencies

**Backend (Python):**
1. Add package to `backend/requirements.txt`
2. Rebuild container: `docker compose up --build backend`

**Frontend (Node):**
1. Add package: `docker compose exec frontend npm install <package>`
2. Or modify `frontend/package.json` and rebuild

## API Endpoints

### Health Check
```bash
GET /api/health/
```

Response:
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

## Stopping the Application

```bash
# Stop containers
make down

# Stop and remove volumes (database data will be lost)
make clean
```

## Production Deployment

For production:
1. Update `SECRET_KEY` in `.env` with a secure random string
2. Set `DEBUG=False` in `.env`
3. Configure `ALLOWED_HOSTS` properly
4. Use production-ready database credentials
5. Consider using external PostgreSQL service
6. Set up SSL/TLS certificates for Nginx
7. Update frontend build to use `npm run build` and `npm start`

## Troubleshooting

**Port already in use:**
- Stop other services using ports 80, 3000, 8000, or 5432
- Or modify ports in `docker-compose.yml`

**Database connection issues:**
- Ensure PostgreSQL container is healthy: `docker compose ps`
- Check logs: `make logs` or `docker compose logs db`

**Frontend can't reach backend:**
- Verify backend is running: `docker compose ps`
- Check API at http://localhost:8000/api/health/
- Check backend logs: `make logs-backend`

## License

MIT
