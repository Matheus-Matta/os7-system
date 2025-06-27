#!/usr/bin/env sh
set -e

# 1) espera o Postgres, se estiver usando
if [ "$DATABASE" = "postgres" ]; then
  echo "→ Waiting for Postgres at $SQL_HOST:$SQL_PORT…"
  until pg_isready -h "$SQL_HOST" -p "$SQL_PORT" -U "$POSTGRES_USER" > /dev/null 2>&1; do
    sleep 0.1
  done
  echo "→ PostgreSQL started"
fi

# 6) finalmente executa o comando passado ao container (Gunicorn)
exec "$@"
