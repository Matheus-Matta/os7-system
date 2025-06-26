
from _app.siteconfig.models import SiteConfig

def config(request):
    cfg = SiteConfig.objects.filter(is_active=True).first()
    request.config = cfg
    return {}