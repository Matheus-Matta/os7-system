# _app/config/admin.py
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from unfold.admin import ModelAdmin

from .models import SiteConfig
from .forms import SiteConfigForm

@admin.register(SiteConfig)
class SiteConfigAdmin(ModelAdmin):
    form = SiteConfigForm
    list_display = ("config_name", "is_active", "updated_at")
    list_filter  = ("is_active",)