from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse, FileResponse
from main_app.models import Vacancy, Task
from django.utils import timezone


import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_file(request):
    try:
        job_id = request.GET['file_id']
        task = Task.object.filter(id__in=[job_id])
        return FileResponse(task.task_file)
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
