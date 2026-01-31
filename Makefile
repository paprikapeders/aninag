.PHONY: serve serve-artisan up down restart logs shell artisan npm-dev npm-build clean

# Start all services: docker compose and npm dev server
serve:
	@echo "Starting Docker services..."
	docker compose app
	@echo "Waiting for services to be ready..."
	timeout /t 3 /nobreak > nul
	@echo "Starting npm dev server..."
	npm run dev

# Run php artisan serve in Docker and npm dev outside
serve-artisan:
	@echo "Starting Docker services..."
	docker compose up -d
	@echo "Waiting for services to be ready..."
	timeout /t 3 /nobreak > nul
	@echo "Starting PHP artisan serve in Docker..."
	start /B docker exec laravel_web php artisan serve
	@echo "Starting npm dev server..."
	npm run dev

# Start docker services only
up:
	docker compose up -d

# Stop all services
down:
	docker compose down

# Restart all services
restart:
	docker compose restart

# View logs
logs:
	docker compose logs -f

# Access app container shell
shell:
	docker compose exec app bash

# Run artisan commands (usage: make artisan cmd="migrate")
artisan:
	docker compose exec app php artisan $(cmd)

# Run npm dev server
npm-dev:
	npm run dev

# Build frontend assets
npm-build:
	npm run build

# Clean up containers and volumes
clean:
	docker compose down -v
