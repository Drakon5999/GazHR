from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Candidate
import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def update_scenario_step(request):
    try:
        data = json.loads(request.body)
        candidate = Candidate.objects.get(id=data["candidate_id"])
        candidate.scenario_step += 1
        candidate.save()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
