from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Scenario
import json
import datetime

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def create_scenario(request):
    try:
        data = json.loads(request.body)
        s = Scenario(name=data['name'], json_scenario=data[
                     'json_scenario'], created_timestamp=datetime.datetime.now())
        s.save()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
