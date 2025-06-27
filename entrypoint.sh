#!/usr/bin/env sh
set -e

# 1) espera o Postgres, se estiver usando
if [ "$DATABASE" = "postgres" ]; then
  echo "→ Waiting for Postgres at $SQL_HOST:$SQL_PORT…"
  while ! nc -z "$SQL_HOST" "$SQL_PORT"; do
    sleep 0.1
  done
  echo "→ PostgreSQL started"
fi

# 2) limpa o banco (flush)
echo "→ Flushing database…"
python manage.py flush --no-input

# 3) gera migrations
echo "→ Making migrations for siteconfig and analytics…"
python manage.py makemigrations siteconfig analytics --no-input

# 4) aplica migrations
echo "→ Applying migrations…"
python manage.py migrate --no-input

# 5) coleta estáticos
echo "→ Collecting static files…"
python manage.py collectstatic --no-input

# 6) finalmente executa o comando passado ao container (Gunicorn)
exec "$@"
