####################################
# 1) STAGE: builder
####################################
FROM python:3.11.4-slim-bullseye AS builder

# evita .pyc e buffer de saída
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /usr/src/app

# instala compiladores e libs para psycopg2 e pysqlite3 (se precisar)
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      gcc \
      libpq-dev \
      libsqlite3-dev \
      python3-dev \
 && rm -rf /var/lib/apt/lists/*

# gera as wheels das dependências
COPY requirements.txt .
RUN pip install --upgrade pip wheel \
 && pip wheel --no-cache-dir --wheel-dir /usr/src/app/wheels -r requirements.txt


#########
# FINAL #
#########

# base Bullseye (SQLite ≥ 3.31, compatível com Django 5.2+)
FROM python:3.11.4-slim-bullseye

# cria usuário e pastas
RUN mkdir -p /home/app \
 && addgroup --system app \
 && adduser --system --ingroup app app

ENV HOME=/home/app
ENV APP_HOME=/home/app/web

# cria diretórios de estáticos e mídia
RUN mkdir -p $APP_HOME/staticfiles \
 && mkdir -p $APP_HOME/mediafiles

WORKDIR $APP_HOME

# instala runtime deps, incluindo cliente Postgres e sqlite3
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      netcat \
      postgresql-client \
      sqlite3 \
      libsqlite3-dev \
 && rm -rf /var/lib/apt/lists/*

# copia e instala as wheels
COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache /wheels/*

# entrypoint
COPY entrypoint.sh .
RUN sed -i 's/\r$//g' entrypoint.sh \
 && chmod +x entrypoint.sh

# código da aplicação
COPY . .

# permissões
RUN chown -R app:app $APP_HOME

# troca para usuário app
USER app

# entrypoint final
ENTRYPOINT ["sh", "/home/app/web/entrypoint.sh"]
