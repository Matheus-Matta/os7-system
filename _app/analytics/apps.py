# _app/config/apps.py
from django.apps import AppConfig

class AnalyticsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_app.analytics'
    verbose_name = "Analytics"