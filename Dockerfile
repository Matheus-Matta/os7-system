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

# pull official base image
FROM python:3.11.4-slim-buster

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup --system app \
 && adduser --system --ingroup app app

# define diretórios de trabalho
ENV HOME=/home/app
ENV APP_HOME=/home/app/web

RUN mkdir -p $APP_HOME/staticfiles \
 && mkdir -p $APP_HOME/mediafiles

WORKDIR $APP_HOME

# install runtime dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      netcat \
 && rm -rf /var/lib/apt/lists/*

# copia e instala as wheels geradas no builder
COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache /wheels/*

# copia e prepara o entrypoint
COPY entrypoint.sh .
RUN sed -i 's/\r$//g' $APP_HOME/entrypoint.sh \
 && chmod +x $APP_HOME/entrypoint.sh

# copia todo o código da aplicação
COPY . .

# ajusta permissões
RUN chown -R app:app $APP_HOME

# executa como usuário não-root
USER app

# entrypoint final
ENTRYPOINT ["sh", "/home/app/web/entrypoint.sh"]
