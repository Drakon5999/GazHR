from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy, Resume, Vacancy2Resume
import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def remove_vacancy2resume(request):
    try:
        data = json.loads(request.body)
        resume = Resume.objects.get(id=data["resume_id"])
        vacancy = Vacancy.objects.get(id=data["vacancy_id"])
        v2r = Vacancy2Resume.objects.get(vacancy_id=vacancy, resume_id=resume)
        v2r.delete()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
