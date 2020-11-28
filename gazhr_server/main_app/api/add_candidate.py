from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse

import datetime

from main_app.models import Candidate

import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def add_candidate(request):
    try:
        data = json.loads(request.body)
        candidate = Candidate(
            full_name=data["full_name"],
            addition_info=data["addition_info"],
            created_timestamp=datetime.datetime.now()
        )
        candidate.save()
        return JsonResponse({"status": 200, "id": int(candidate.id)})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
