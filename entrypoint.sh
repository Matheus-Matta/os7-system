#!/usr/bin/env bash
set -e

if [ -n "$DB_HOST" ]; then
  echo "⏳ Aguardando Postgres em $DB_HOST:$DB_PORT..."
  until PGPASSWORD="$DB_PASSWORD" psql \
    -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\l' &> /dev/null; do
    >&2 echo "Postgres não disponível – aguardando 2s..."
    sleep 2
  done
  echo "✅ Postgres disponível!"
fi

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