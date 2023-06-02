git checkout prod && git pull && docker-compose --compatibility -p ows-events_prod -f docker-compose.prod.yml up -d --force-recreate --build
