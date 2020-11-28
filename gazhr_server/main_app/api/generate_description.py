from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Vacancy
import json
import requests


def generate_description(request):
    try:
        data = json.loads(request.body)
        response = requests.post('http://example.com', data=data)
        return JsonResponse({"status": 200, "data": response})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
