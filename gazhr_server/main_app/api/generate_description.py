from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Vacancy
import json
import requests
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def generate_description(request):
    try:
        data = json.loads(request.body)
        try:
            model_response = requests.post('http://{}:{}/generate'.format(settings.MODEL_HOST, settings.MODEL_PORT), data=data).json()
        except:
            model_response = {
                            "description":"текст вакансии",
                            "suggests": [
                                "experience",
                                "skills"
                            ]
            }

        return JsonResponse({"status": 200, "data": model_response})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
