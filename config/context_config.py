
from _app.config.models import SiteConfig

def config(request):
    cfg = SiteConfig.objects.filter(is_active=True).first()
    request.config = cfg
    return {}