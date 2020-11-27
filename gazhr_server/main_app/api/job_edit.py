from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy
import json



def job_edit(request):
    d = json.loads(request.body)
    vac = Vacancy.objects.get(d["job_id"])
    d.pop("job_id")
    for attr, val in d.items():
        setattr(vac, attr, val)
    vac.save()
    return HttpResponse(status=200)
