from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Scenario
import json


def get_scenario(request):
    data = json.loads(request.data)
    s = Scenario.objects.get(id=data['scenario_id'])
    return JsonResponse(s.json_scenario)