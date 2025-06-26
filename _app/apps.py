from django.apps import AppConfig

class _AppConfig(AppConfig):
    name = '_app'

    def ready(self):
        import _app.signals