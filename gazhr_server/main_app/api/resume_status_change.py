from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Resume
import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def resume_status_change(request):
    try:
        data = json.loads(request.body)
        res_id = data.pop('resume_id')
        res = Resume.objects.get(id=res_id)
        for attr, val in data.items():
            setattr(res, attr, val)
        res.save()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
