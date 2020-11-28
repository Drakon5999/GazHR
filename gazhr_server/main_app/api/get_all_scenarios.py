from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Scenario
import json
import requests
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_all_scenarios(request):
    try:
        scenarios = Scenario.objects.all()
        arr = []
        for s in scenarios:
            arr.append({"scenario_id": s.id, "name": s.name})
        ans = {"all_scenarios": arr}
        return JsonResponse({"status": 200, "data": ans})
    except BaseException as ex:
        return JsonResponse({"status": 404, "error": str(ex)})
