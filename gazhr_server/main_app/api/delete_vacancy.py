from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Vacancy
import json
import requests
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def delete_vacancy(request):
    try:
        data = json.loads(request.data)
        Vacancy.objects.filter(id=data['job_id']).delete()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
