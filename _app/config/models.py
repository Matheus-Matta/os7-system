from django.db import models
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from simple_history.models import HistoricalRecords
from django.utils.translation import gettext_lazy as _

class SiteConfig(models.Model):
    config_name = models.CharField(
        _("Nome da Configuração"),
        max_length=100,
        default=_("Minha Configuração")
    )
    logo = models.ImageField(
        _("Logo"),
        upload_to='logos/',
        blank=True,
        null=True
    )

    email = models.EmailField(
        _("E-mail de Contato"),
        max_length=100,
        blank=True,
        null=True
    )
    phone = models.CharField(
        _("Telefone"),
        max_length=20,
        blank=True,
        null=True
    )
    address = models.TextField(
        _("Endereço"),
        blank=True,
        null=True
    )
    business_hours = models.TextField(
        _("Horário de Atendimento"),
        blank=True,
        null=True
    )

    facebook = models.URLField(
        _("Facebook"),
        blank=True,
        null=True
    )
    instagram = models.URLField(
        _("Instagram"),
        blank=True,
        null=True
    )
    twitter = models.URLField(
        _("Twitter"),
        blank=True,
        null=True
    )
    linkedin = models.URLField(
        _("LinkedIn"),
        blank=True,
        null=True
    )
    whatsapp = models.URLField(
        _("WhatsApp"),
        blank=True,
        null=True
    )

    is_active = models.BooleanField(
        _("Ativa"),
        default=False
    )
    updated_at = models.DateTimeField(
        _("Atualizado em"),
        auto_now=True
    )

    history = HistoricalRecords()

    class Meta:
        verbose_name = _("Configuração do Site")
        verbose_name_plural = _("Configurações do Site")

    def save(self, *args, **kwargs):
        if self.is_active:
            # Garante que apenas uma configuração esteja ativa
            SiteConfig.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.config_name} {_('(Ativa)') if self.is_active else ''}"

@receiver(post_migrate)
def create_default_site_config(sender, **kwargs):
    # Cria configuração padrão se não existir nenhuma
    if SiteConfig.objects.count() == 0:
        SiteConfig.objects.create(
            config_name=_("Configuração Padrão do Site (Ativa)"),
            is_active=True,
            email="contato@exemplo.com",
            phone="(00) 0000-0000",
            address=_("Endereço de Exemplo"),
            business_hours=_("Segunda a Sexta, 8h às 18h")
        )
