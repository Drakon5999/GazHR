from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy, Task
from django.utils import timezone


import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def job_upload_file(request):
    try:
        task_file = request.FILES['test_file']
        job_id = request.GET['job_id']
        vacancy = Vacancy.object.filter(id__in=[job_id])
        t = Task(name=task_file.name, task_file=task_file, created_timestamp=timezone.now())
        t.save()
        vacancy.task_id = t.id
        vacancy.save()
        return JsonResponse({"status": 200, "file_id":t.id})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
