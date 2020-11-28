from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy, Vacancy2Resume, Resume, Candidate, Task
import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_job_full_info(request):
    try:
        d = json.loads(request.body)
        job_id = d["job_id"]
        vacancy = Vacancy.objects.get(id=job_id)
        vac_2_can = Vacancy2Resume.objects.filter(vacancy_id=job_id)
        resumes = []
        for can in vac_2_can:
            resumes.append(Resume.objects.get(id=can.resume_id))
        candidates = []
        for x in resumes:
            cand = Candidate.objects.get(x.candidate_id)
            tmp = {"candidate_id": x.candidate_id, "status": x.status,
                   "name": cand.full_name, "score": x.score}
            candidates.append(tmp)

        task = Task.objects.get(vacancy.task_id) if vacancy.task_id is not None else None

        ans = {
            "job_id": job_id, "name": vacancy.name,
            "transformed_text": vacancy.transformed_text,
            "source_text": vacancy.source_text,
            "scenario_id": vacancy.scenario_id, "candidates": candidates,
            "test_files": [{"name": task.name, "test_file_url": task.file}] if task is not None else []
        }
        return JsonResponse({"status": 200, "data": json.dumps(ans)})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
