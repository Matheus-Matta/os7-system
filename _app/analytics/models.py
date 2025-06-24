from django.db import models

class Event(models.Model):
    EVENT_CHOICES = [
        ('visit',      'Visita'),
        ('click',      'Clique'),
        ('conversion', 'Conversão'),
    ]

    event_type  = models.CharField(max_length=20, choices=EVENT_CHOICES)
    source      = models.CharField("Referenciador", max_length=100, blank=True, null=True)
    occurred_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['event_type', 'occurred_at']),
            models.Index(fields=['source']),
        ]

    def __str__(self):
        return self.event_type