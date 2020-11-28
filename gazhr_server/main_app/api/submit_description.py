from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.utils import timezone
from main_app.models import Vacancy
import json
import requests
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def submit_description(request):
    try:
        data = json.loads(request.body)
        model_response = requests.post('http://{}:{}/generate'.format(settings.MODEL_HOST, settings.MODEL_PORT), json=data).json()
        vacancy = Vacancy(
            source_text=data['text'],
            transformed_text=model_response['description'],
            created_timestamp=timezone.now(),
            name=data.get("name")
        )
        vacancy.save()

        return JsonResponse({
            'status': 200,
            'job_id': vacancy.id
        })
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
