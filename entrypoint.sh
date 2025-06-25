#!/bin/sh

echo "Aguardando banco de dados estar pronto..."

# Testa conexão com o PostgreSQL
while ! nc -z db 5432; do
  sleep 1
done

echo "✅ Banco de dados pronto!"

echo "📦 Aplicando migrações..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "🎯 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

echo "🚀 Iniciando servidor Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
