# Base Python
FROM python:3.12-slim

# Define diretório da aplicação
WORKDIR /app

# Copia dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do projeto
COPY . .

# Copia e executa o script de entrada
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expõe a porta usada pelo Gunicorn
EXPOSE 8000

RUN apt install -y netcat

# Comando padrão
ENTRYPOINT ["/entrypoint.sh"]
