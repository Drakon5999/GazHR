from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.urls import path, reverse
from django.shortcuts import render

from main_app.api.submit_description import submit_description
from main_app.api.generate_description import generate_description
from main_app.api.get_jobs_list import get_jobs_list
from main_app.api.candidate_info import candidate_info
from main_app.api.job_edit import job_edit
from main_app.api.job_upload_file import job_upload_file
from main_app.api.get_file import get_file
from main_app.api.get_candidate_info import get_candidate_info
from main_app.api.get_candidate_vacancy_info import get_candidate_vacancy_info
from main_app.api.get_job_full_info import get_job_full_info
from main_app.api.get_scenario import get_scenario
from main_app.api.resume_status_change import resume_status_change

urlpatterns = [
    path("api/get_jobs_list", get_jobs_list, name="api/get_jobs_list"),
    path("api/submit_description", submit_description,
         name="api/submit_description"),
    path("api/generate_description", generate_description,
         name="api/generate_description"),
    path("api/candidate_info", candidate_info, name="api/candidate_info"),
    path("api/job_edit", job_edit, name="api/job_edit"),
    path("api/job_upload_file", job_upload_file, name="api/job_upload_file"),
    path("api/get_file", get_file, name="api/get_file"),
    path("api/get_candidate_info", get_candidate_info,
         name="api/get_candidate_info"),
    path("api/get_candidate_vacancy_info", get_candidate_vacancy_info,
         name="api/get_candidate_vacancy_info"),
    path("api/get_job_full_info", get_job_full_info,
         name="api/get_job_full_info"),
    path("api/get_scenario", get_scenario, name="api/get_scenario"),
    path("api/resume_status_change", resume_status_change,
         name="api/resume_status_change"),
]
