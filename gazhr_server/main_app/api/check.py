from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.utils import timezone
from main_app.models import Vacancy, Resume, Vacancy2Resume
import json
import requests
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def check(request):
    try:
        data = json.loads(request.body)
        vacancy = Vacancy.objects.get(id=data["vacancy_id"])
        resume = Resume.objects.get(id=data["resume_id"])
        tmp_data = {"vacancy": vacancy.transformed_text, "resume": resume.text}
        model_response = requests.post(
            'http://{}:{}/check'.format(settings.MODEL_HOST, settings.MODEL_PORT), json=tmp_data).json()
        v2r = Vacancy2Resume.objects.get(vacancy_id=vacancy, resume_id=resume)
        v2r.score = model_response["score"]
        v2r.save()
        return JsonResponse({
            'status': 200,
            'job_id': model_response["score"]
        })
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
