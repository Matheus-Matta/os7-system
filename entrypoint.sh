#!/usr/bin/env bash
set -e

# aguarda o banco ficar disponível
if [ "$DATABASE_URL" ]; then
  until psql "$DATABASE_URL" -c '\l'; do
    >&2 echo "Postgres não disponível - aguardando..."
    sleep 1
  done
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