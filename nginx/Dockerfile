FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=web /home/app/web/staticfiles /home/app/web/staticfiles
COPY --from=web /home/app/web/mediafiles  /home/app/web/staticfiles
EXPOSE 80