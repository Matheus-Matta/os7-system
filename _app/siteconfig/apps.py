# _app/config/apps.py
from django.apps import AppConfig

class SiteConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_app.siteconfig'      # <— reflete o novo nome da pasta
    verbose_name = "Configurações"