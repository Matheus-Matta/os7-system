from .views import track
from django.urls import path

app_name = 'analytics'
urlpatterns = [
    path('track/', track, name='track'),
]