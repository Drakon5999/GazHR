from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy


import json


def job_edit(request):
    try:
        data = json.loads(request.body)
        job_id = data.pop("job_edit")
        vacancy = Vacancy.object.filter("id__in"=[job_id])
        for key, value in data.items():
            setattr(vacancy, key, value)
        vacancy.save()
        return JsonResponse({"status": 200})
    except:
        return JsonResponse({"status": 404})

