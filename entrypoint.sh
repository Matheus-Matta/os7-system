#!/usr/bin/env bash
set -e

echo "⏳ Aguardando Postgres em $DB_HOST:$DB_PORT…"

until pg_isready \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" > /dev/null 2>&1
do
  >&2 echo "Postgres não pronto — aguardando 2s..."
  sleep 2
done

echo "✅ Postgres pronto! Iniciando migrações…"

# aplica migrações, coleta static e inicia Gunicorn
python manage.py makemigrations siteconfig analytics  --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput

# executa gunicorn
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --reload \
    --access-logfile - \
    --error-logfile - \
    --log-level debug