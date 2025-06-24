import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Event

@csrf_exempt
def track(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Event.objects.create(
          event_type = data.get('event_type'),
          source     = data.get('source', '')
        )
        return JsonResponse({'status':'ok'})
    return JsonResponse({'status':'error'}, status=400)