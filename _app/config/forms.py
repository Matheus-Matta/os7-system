# Formulário usando django-crispy-forms e tradução em Português
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Submit
from .models import SiteConfig
from django.utils.translation import gettext_lazy as _

class SiteConfigForm(forms.ModelForm):
    class Meta:
        model = SiteConfig
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = "post"
        self.helper.layout = Layout(
            Fieldset(
                _("Geral"),
                "config_name",
                "logo",
                "is_active",
            ),
            Fieldset(
                _("Contato"),
                "email",
                "phone",
                "address",
                "business_hours",
            ),
            Fieldset(
                _("Redes Sociais"),
                "facebook",
                "instagram",
                "twitter",
                "linkedin",
                "whatsapp",
            ),
            Submit("submit", _("Salvar")),
        )
