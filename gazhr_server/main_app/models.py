from django.db import models

# Create your models here.


class Scenario(models.Model):
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )
    json_scenario = models.JSONField(null=True)


class Task(models.Model):
    name = models.TextField(help_text="Task text")
    path = models.TextField(help_text="Path to task documents")
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )


class Vacancy(models.Model):
    name = models.TextField(help_text="Vacancy name")
    source_text = models.TextField(help_text="Source text of vacancy")
    transfored_text = models.TextField(
        help_text="Text of vacancy after transformation"
    )
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )
    finished_timestamp = models.DateTimeField(
        help_text="Timestamp of expiration"
    )
    scenario_id = models.ForeignKey(Scenario, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)


class Candidate(models.Model):
    full_name = models.TextField(help_text="Full name")
    status = models.TextField(help_text="Сandidate status")
    addition_info = models.JSONField(null=True)
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )


class Resume(models.Model):
    candidate_id = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    text = models.TextField(help_text="Resume text")
    tags = models.JSONField(null=True)
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )


class Vacancy2Resume(models.Model):
    vacancy_id = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
    resume_id = models.ForeignKey(Resume, on_delete=models.CASCADE)
    score = models.FloatField(help_text="Сompliance score")
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )
