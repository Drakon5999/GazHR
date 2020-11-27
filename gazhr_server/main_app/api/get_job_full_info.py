from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy, Vacancy2Resume, Resume, Candidate, Task
import json

def get_job_full_info(job_id):
    vacancy = Vacancy.objects.get(id=job_id)
    vac_2_can = Vacancy2Resume.objects.filter(vacancy_id=job_id)
    resumes = []
    for can in vac_2_can:
        resumes.append(Resume.objects.get(id=can.resume_id))
    candidates = []
    for x in resumes:
        cand = Candidate.objects.get(x.candidate_id)
        tmp = {"candidate_id": x.candidate_id, "status": x.status, "name": cand.full_name}
        candidates.append(tmp)

    task = Task.objects.get(vacancy.task_id)

    ans = {"job_id": job_id, "job_name": vacancy.name, "job_description": vacancy.source_text,
           "scenario_id": vacancy.scenario_id, "candidates": candidates,
           "test_files": [{"name": task.name, "test_file_url": task.file}]}
    return JsonResponse(json.dumps(ans))
