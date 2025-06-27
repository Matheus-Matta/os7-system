#!/usr/bin/env sh
set -e

# Espera o web coletar estáticos
echo "→ aguardando staticfiles..."
while [ ! -f /home/app/web/staticfiles/admin/css/base.css ]; do
  sleep 0.2
done

# Copia pro diretório que o nginx realmente serve
echo "→ copiando staticfiles e mediafiles"
cp -a /home/app/web/staticfiles/. /usr/share/nginx/html/static/
cp -a /home/app/web/media/.  /usr/share/nginx/html/media/

# Inicia o nginx
nginx -g 'daemon off;'
