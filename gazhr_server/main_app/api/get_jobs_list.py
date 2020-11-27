from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Vacancy


def get_jobs_list(request):
    valancy = Vacancy.objects.all()
    return JsonResponse(
        {
            "jobs": [
                {
                    "job_name": x.name,
                    "job_description": x.transfored_text,
                    "job_id": x.id,
                } for x in valancy
            ]
        }
    )
