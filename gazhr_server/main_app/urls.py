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
from main_app.api.get_all_scenarios import get_all_scenarios
from main_app.api.delete_vacancy import delete_vacancy
from main_app.api.create_scenario import create_scenario
from main_app.api.check import check
from main_app.api.remove_vacancy2resume import remove_vacancy2resume
from main_app.api.update_scenario_step import update_scenario_step
from main_app.api.send_email import send_email

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

    path("api/get_all_scenarios", get_all_scenarios,
         name="api/get_all_scenarios"),
    path("api/delete_vacancy", delete_vacancy,
         name="api/delete_vacancy"),
    path("api/create_scenario", create_scenario,
         name="api/create_scenario"),
    path("api/check", check, name="api/check"),
    path("api/remove_vacancy2resume", remove_vacancy2resume,
         name="api/remove_vacancy2resume"),
    path("api/update_scenario_step", update_scenario_step,
         name="api/update_scenario_step"),
    path("api/send_email", send_email, name="api/send_email"),

]
