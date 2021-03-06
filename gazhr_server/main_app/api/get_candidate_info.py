from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Candidate
import json
import requests

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_candidate_info(request):
    try:
        data = json.loads(request.body)
        can = Candidate.objects.get(id=data["candidate_id"])
        ans = {
            "name": can.full_name,
            "additional_json": can.addition_info, "id": int(can.id)
        }
        return JsonResponse({"status": 200, "data": ans})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
