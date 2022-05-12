run-dev:
	docker-compose up

build-dev:
	docker-compose up -d --build

run-prod:
	docker-compose -f docker-compose.prod.yml up

build-prod:
	docker-compose -f docker-compose.prod.yml up -d --build