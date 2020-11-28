from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Resume, Vacancy, Vacancy2Resume
import datetime

import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def join_vacancy_with_resume(request):
    try:
        data = json.loads(request.body)
        vacancy_id = data.get("vacancy_id", None)
        resume_id = data.get("resume_id", None)
        vacancy = Vacancy.objects.get(id=vacancy_id)
        resume = Resume.objects.get(id=resume_id)
        v2r = Vacancy2Resume(
            vacancy_id=vacancy, resume_id=resume,
            score=0, created_timestamp=datetime.datetime.now()
        )
        v2r.save()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
