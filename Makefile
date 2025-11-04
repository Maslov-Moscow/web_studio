.PHONY: help build up down restart logs exec exec-frontend exec-db migrate makemigrations createsuperuser shell collectstatic clean

help:
	@echo "WebStudio - Makefile commands"
	@echo ""
	@echo "  make build          - Build all Docker containers"
	@echo "  make up             - Start all services"
	@echo "  make down           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make logs           - View logs from all services"
	@echo "  make exec           - Enter backend container shell"
	@echo "  make exec-frontend  - Enter frontend container shell"
	@echo "  make exec-db        - Enter PostgreSQL container"
	@echo "  make migrate        - Run Django migrations"
	@echo "  make makemigrations - Create new Django migrations"
	@echo "  make createsuperuser - Create Django superuser"
	@echo "  make shell          - Open Django shell"
	@echo "  make collectstatic  - Collect static files"
	@echo "  make clean          - Stop and remove all containers, volumes"

build:
	docker compose build

up:
	docker compose up

up-d:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

exec:
	docker compose exec backend /bin/bash

exec-frontend:
	docker compose exec frontend /bin/sh

exec-db:
	docker compose exec db psql -U postgres -d webstudio

migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations

createsuperuser:
	docker compose exec backend python manage.py createsuperuser

shell:
	docker compose exec backend python manage.py shell

collectstatic:
	docker compose exec backend python manage.py collectstatic --noinput

clean:
	docker compose down -v
	docker system prune -f
