from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Vacancy

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_jobs_list(request):
    valancy = Vacancy.objects.all()
    return JsonResponse(
        {
            "status": 200,
            "jobs": [
                {
                    "job_id": int(x.id),
                    "job_name": x.name,
                    "job_description": x.transformed_text,
                    "scenario_id": int(x.scenario_id.id)
                } for x in valancy
            ]
        }
    )
