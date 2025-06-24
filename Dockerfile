FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# Coletar arquivos estáticos
RUN python manage.py collectstatic --noinput

# Realizar as migrações do banco de dados
RUN python manage.py makemigrations --noinput
RUN python manage.py migrate --noinput
