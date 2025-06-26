####################################
# 1) STAGE: builder
####################################
FROM python:3.11.4-slim-bullseye AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /usr/src/app

# instala compiladores e libs para compilar psycopg2 e pysqlite3
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


####################################
# 2) STAGE: runtime
####################################
FROM python:3.11.4-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HOME=/home/app \
    APP_HOME=/home/app/web

# cria usuário não-root
RUN mkdir -p $APP_HOME \
 && addgroup --system app \
 && adduser --system --ingroup app app

WORKDIR $APP_HOME

# instala runtime libs (inclui sqlite3 >=3.31)
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      sqlite3 \
      netcat \
      libpq5 \
      postgresql-client \
 && rm -rf /var/lib/apt/lists/*

# instala dependências Python pré-compiladas
COPY --from=builder /usr/src/app/wheels /wheels
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache /wheels/*

# prepara entrypoint
COPY entrypoint.sh .
RUN sed -i 's/\r$//g' entrypoint.sh \
 && chmod +x entrypoint.sh

# copia o restante do código
COPY . .

# aplica dono não-root e troca de usuário
RUN chown -R app:app $APP_HOME
USER app

ENTRYPOINT ["./entrypoint.sh"]
