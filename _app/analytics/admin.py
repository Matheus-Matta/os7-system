from django.utils import timezone
from django.db.models import Count
from django.db.models.functions import TruncDay, TruncWeek, TruncMonth
from django.core.cache import cache
from django.http import HttpResponseForbidden
from .models import Event
from datetime import timedelta

def dashboard_stats(request, context):
    # 1) Permissão
    if not request.user.is_superuser:
        return HttpResponseForbidden()


    today = timezone.now().date()

    if 'from' in request.GET or 'to' in request.GET:
        try:
            to_date   = timezone.datetime.fromisoformat(request.GET.get('to')).date()
            from_date = timezone.datetime.fromisoformat(request.GET.get('from')).date()
        except Exception:
            to_date   = today
            from_date = today - timezone.timedelta(days=7)
    else:
        # sem filtro manual, usa preset (default 'year')
        preset = request.GET.get('preset', 'year')
        if preset == 'month':
            from_date = today.replace(day=1)
            to_date   = today
        elif preset == 'week':
            # início da semana (segunda)
            from_date = today - timezone.timedelta(days=today.weekday())
            to_date   = today
        else:  # 'year' ou qualquer outro valor
            from_date = today.replace(month=1, day=1)
            to_date   = today

    cache_key = f"dash_stats_{from_date}_{to_date}"
    stats = cache.get(cache_key)
    if not stats:
        qs = Event.objects.filter(occurred_at__date__range=(from_date, to_date))

        # Totais
        total_visits     = qs.filter(event_type='visit').count()
        total_clicks     = qs.filter(event_type='click').count()
        total_conversions= qs.filter(event_type='conversion').count()

        # Referências top 5
        top_sources = (
            qs.values('source')
              .annotate(count=Count('id'))
              .order_by('-count')[:5]
        )
        sources_labels = [item['source'] or 'Direto' for item in top_sources]
        sources_data   = [item['count'] for item in top_sources]

        # Agregação por período
        span = (to_date - from_date).days
        if span <= 30:
            trunc = TruncDay('occurred_at')
            date_fmt = '%Y-%m-%d'
        elif span <= 180:
            trunc = TruncWeek('occurred_at')
            date_fmt = '%Y-%W'
        else:
            trunc = TruncMonth('occurred_at')
            date_fmt = '%Y-%m'

        grouped = (
            qs.annotate(period=trunc)
              .values('period', 'event_type')
              .annotate(count=Count('id'))
              .order_by('period')
        )
        periods = sorted({g['period'].strftime(date_fmt) for g in grouped})
        series = {et: [] for et,_ in Event.EVENT_CHOICES}

        for p in periods:
            for et,_ in Event.EVENT_CHOICES:
                series[et].append(
                  next((g['count'] for g in grouped 
                        if g['period'].strftime(date_fmt)==p and g['event_type']==et), 0)
                )

        stats = {
          'heatmap' :{
            "hours": [f"{h}:00" for h in range(24)],  # labels do eixo X
            "series": [
                {"name": "Segunda", "data": monday_counts},
                {"name": "Terça", "data": tuesday_counts},
                {"name": "Quarta", "data": wednesday_counts},
                {"name": "Quinta", "data": thursday_counts},
                {"name": "Sexta", "data": friday_counts},
                {"name": "Sábado", "data": saturday_counts},
                {"name": "Domingo", "data": sunday_counts},
            ],
          },           
          'totals': {
            'visits': total_visits,
            'clicks': total_clicks,
            'conversions': total_conversions,
          },
          'sources': {
            'labels': sources_labels,
            'data': sources_data,
          },
          'trend': {
            'periods': periods,
            'series': series,
          },
          'from': from_date.isoformat(),
          'to':   to_date.isoformat(),
        }
        cache.set(cache_key, stats, 300)

    context.update({'stats': stats})
    return context


def test_dashboard_stats(request, context):
    # 1) Permissão
    if not request.user.is_superuser:
        return HttpResponseForbidden()

    today = timezone.now().date()

    # sempre últimos 7 dias no teste
    from_date = today - timedelta(days=6)
    to_date   = today

    # Dados fictícios:
    import random

    # Totais
    total_visits      = random.randint(500, 2000)
    total_clicks      = random.randint(200, 1000)
    total_conversions = random.randint(50, 300)

    # Top fontes
    sources_labels = ["Google", "Facebook", "Twitter", "LinkedIn", "Direto"]
    sources_data   = [random.randint(50,300) for _ in sources_labels]

    # Trend (7 dias)
    trend_periods = [(today - timedelta(days=i)).strftime("%Y-%m-%d") for i in reversed(range(7))]
    trend_series = {
        "visit":      [random.randint(100, 500) for _ in trend_periods],
        "click":      [random.randint(50, 300)  for _ in trend_periods],
        "conversion": [random.randint(10, 100)  for _ in trend_periods],
    }

    # Heatmap (7x24)
    hours = list(range(0, 24, 2))
    hours = [f"{h} - {h+2}" for h in hours]
    dias  = ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"]

    heatmap_series = []
    for dia in dias:
        # para cada label de hora, gera um valor
        data = [random.randint(0,50) for _ in hours]
        heatmap_series.append({
            "name":  dia,
            "data":  data,
            "total": sum(data),
        })

    stats = {
        "heatmap": {"hours": hours, "series": heatmap_series},
        "totals":  {"visits": total_visits, "clicks": total_clicks, "conversions": total_conversions},
        "sources": {"labels": sources_labels, "data": sources_data},
        "trend":   {"periods": trend_periods, "series": trend_series},
        "from":    from_date.isoformat(),
        "to":      to_date.isoformat(),
    }

    context.update({"stats": stats})
    return context