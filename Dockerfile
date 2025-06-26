# 1) STAGE: builder
FROM python:3.11.4-slim-buster AS builder

# evita .pyc e buffer
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# instala compiladores e libs para psycopg2, etc.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# copia apenas o requirements e gera as wheels
COPY requirements.txt .
RUN pip install --upgrade pip wheel \
    && pip wheel --no-cache-dir --wheel-dir /app/wheels -r requirements.txt

# 2) STAGE: runtime
FROM python:3.11.4-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# instala apenas runtime libs (sem build-tools)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       libpq5 \
    && rm -rf /var/lib/apt/lists/*

# copia as wheels pré-construídas e instala
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache-dir /wheels/*

# copia o código da aplicação
COPY . .

# entrypoint já cuida de migrações, collectstatic e gunicorn
ENTRYPOINT ["/app/entrypoint.sh"]
