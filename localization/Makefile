install: .env
	poetry install --extras psycopg2-binary

check:
	poetry check

start:
	poetry run python start.py

docker-up:
	docker-compose up -d --build

docker-stop:
	docker-compose stop

lint:
	poetry run flake8

req:
	poetry export --without-hashes --format=requirements.txt > requirements.txt

env:
	cp .env.template .env

commit-i:
	poetry run pre-commit install

commit:
	poetry run pre-commit run -a

setup: env install
