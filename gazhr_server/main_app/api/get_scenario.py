from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Scenario
import json


def get_scenario(request):
    try:
        data = json.loads(request.data)
        s = Scenario.objects.get(id=data['scenario_id'])
        return JsonResponse({"status": 200, "data": s.json_scenario})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
