from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

from main_app.models import Candidate
import json
import requests
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_all_candidates(request):
    try:
        ans = []
        for x in Candidate.objects.all():
            ans.append({
                "full_name": x.full_name,
                "addition_info": x.addition_info,
                "scenario_step": x.scenario_step,
            })
        return JsonResponse({"status": 200, "data": ans})
    except BaseException as ex:
        return JsonResponse({"status": 404, "error": str(ex)})
