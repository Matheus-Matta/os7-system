# _app/config/apps.py
from django.apps import AppConfig

class ConfigConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_app.config'      # <-- caminho completo para this app!
    verbose_name = "Configurações"