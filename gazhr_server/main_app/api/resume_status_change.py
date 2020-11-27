from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Resume
import json


def resume_status_change(request):
    try:
        data = json.loads(request.data)
        res_id = data.pop('resume_id')
        res = Resume.objects.get(id=res_id)
        for attr, val in data.items():
            setattr(res, attr, val)
        res.save()
        return JsonResponse({"status": 200})
    except:
        return JsonResponse({"status": 404})
