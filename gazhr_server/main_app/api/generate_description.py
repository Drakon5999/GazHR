from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Vacancy
import json
import requests
from django.views.decorators.csrf import csrf_exempt
import datetime


@csrf_exempt
def generate_description(request):
    try:
        data = json.loads(request.body)
        model_response = requests.post(
            'http://{}:{}/generate'.format(settings.MODEL_HOST, settings.MODEL_PORT), json=data).json()
        vacancy = Vacancy(
            source_text=data["text"],
            name=model_response["description"],
            transformed_data=model_response,
            created_timestamp=datetime.datetime.now(),
            finished_timestamp=datetime.datetime.now(),
            transformed_text=model_response["hh"]["description"],
        )
        vacancy.save()
        return JsonResponse({"status": 200, "data": model_response})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
