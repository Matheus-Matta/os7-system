####################################
# 1) STAGE: builder
####################################
FROM python:3.11.4-slim-buster AS builder

# evita .pyc e buffer de saída
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /usr/src/app

# instala compiladores e libs para compilar C-extensions
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       gcc \
       libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# gera as wheels das dependências
COPY requirements.txt .
RUN pip install --upgrade pip wheel \
    && pip wheel --no-cache-dir --wheel-dir /usr/src/app/wheels -r requirements.txt


####################################
# 2) STAGE: runtime
####################################
FROM python:3.11.4-slim-buster

# variáveis de ambiente
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HOME=/home/app \
    APP_HOME=/home/app/web

# cria diretório e usuário não-root
RUN mkdir -p $APP_HOME \
    && addgroup --system app \
    && adduser --system --ingroup app app

WORKDIR $APP_HOME

# instala só as libs de runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       sqlite3 \
       netcat \
       libpq5 \
       postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# copia e instala as wheels
COPY --from=builder /usr/src/app/wheels /wheels
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache /wheels/*

# prepara entrypoint
COPY entrypoint.sh .
RUN sed -i 's/\r$//g' entrypoint.sh \
    && chmod +x entrypoint.sh

# copia o código da aplicação
COPY . .

# ajusta permissões e troca para usuário não-root
RUN chown -R app:app $APP_HOME
USER app

# finalmente, dispara o entrypoint
ENTRYPOINT ["sh", "entrypoint.sh"]
