from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Candidate
import json
import requests


def get_candidate_indo(request):
    data = json.loads(request.body)
    can = Candidate.objects.get(id=data.candidate_id)
    ans = {"name": can.full_name, "additional_json": can.addition_info}
    return JsonResponse(json.dumps(ans))


