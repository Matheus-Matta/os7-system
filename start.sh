#!/usr/bin/env sh
# start.sh — inicia o projeto em modo de produção

# sobe os containers, rebuildando imagens
docker-compose -f docker-compose.yml up -d --build

docker-compose -f docker-compose.yml exec web python manage.py makemigrations siteconfig analytics --noinput

# aplica migrations no container web
docker-compose -f docker-compose.yml exec web python manage.py migrate --noinput

# coleta e limpa antigos arquivos estáticos
docker-compose -f docker-compose.yml exec web python manage.py collectstatic --no-input --clear

