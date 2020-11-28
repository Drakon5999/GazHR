from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy, Scenario


import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def job_edit(request):
    try:
        data = json.loads(request.body)
        job_id = data.pop("job_id")
        vacancy = Vacancy.objects.filter(id__in=[job_id]).get()
        for key, value in data.items():
            if key == "scenario_id":
                s = Scenario.objects.get(id=value)
                setattr(vacancy, key, s)
            else:
                setattr(vacancy, key, value)
        vacancy.save()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
