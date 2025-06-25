# _app/signals.py
import os
from django.conf import settings
from django.db.models.signals import post_migrate
from django.contrib.auth import get_user_model
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_superuser(sender, **kwargs):
    User = get_user_model()
    username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
    email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
    password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

    if username and email and password:
        user, created = User.objects.get_or_create(username=username, defaults={
            "email": email,
            "is_superuser": True,
            "is_staff": True,
        })
        if created:
            user.set_password(password)
            user.save()
            print(f"[✔] Superusuário '{username}' criado.")
        else:
            print(f"[•] Superusuário '{username}' já existe.")
    else:
        print("[!] Variáveis de ambiente para superusuário não encontradas.")
