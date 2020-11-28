from django.db import models

# Create your models here.


class Scenario(models.Model):
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )
    name = models.TextField(help_text="Scenario name", default="")
    json_scenario = models.JSONField(null=True)


class Task(models.Model):
    name = models.TextField(help_text="Task text")
    task_file = models.FileField(
        help_text="Path to task documents",
        default=None, null=True
    )
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )


class Vacancy(models.Model):
    name = models.TextField(help_text="Vacancy name")
    source_text = models.TextField(help_text="Source text of vacancy")
    transformed_text = models.TextField(
        help_text="Text of vacancy after transformation"
    )
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )
    finished_timestamp = models.DateTimeField(
        help_text="Timestamp of expiration",
        null=True
    )
    scenario_id = models.ForeignKey(
        Scenario, on_delete=models.CASCADE, null=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE,
                                null=True)
    transformed_data = models.JSONField(null=True)


class Candidate(models.Model):
    full_name = models.TextField(help_text="Full name")
    addition_info = models.JSONField(null=True)
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )
    scenario_step = models.IntegerField(default=0)


class Resume(models.Model):
    candidate_id = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    text = models.TextField(help_text="Resume text")
    tags = models.JSONField(null=True)
    status = models.TextField(help_text="Resume status", default="")
    score = models.FloatField(help_text="Score of resume", default=0.0)
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )


class Vacancy2Resume(models.Model):
    vacancy_id = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
    resume_id = models.ForeignKey(Resume, on_delete=models.CASCADE)
    score = models.FloatField(help_text="Сompliance score", default=0.0)
    created_timestamp = models.DateTimeField(
        help_text="Timestamp of creation"
    )
