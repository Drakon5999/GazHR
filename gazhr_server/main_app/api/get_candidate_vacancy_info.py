from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from main_app.models import Vacancy, Vacancy2Resume, Resume, Candidate, Task
import json


def get_candidate_vacancy_info(request):
    try:
        data = json.loads(request.body)
        vacancy = Vacancy.objects.get(id=data['vacancy_id'])
        candidate = Candidate.objects.get(id=data['candidate_id'])
        vac2can = Vacancy2Resume.objects.filter(vacancy_id=data['vacancy_id'])
        for x in vac2can:
            res = Resume.objects.get(x.resume_id)
            if res.candidate_id == data['candidate_id']:
                ans = {"name": candidate.full_name, "score": res.score, "status": res.status,
                       "additional_json": candidate.addition_info}
                return JsonResponse({"status": 200, "data": json.dumps(ans)})
        return JsonResponse({"status": 200, "data": {}})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
