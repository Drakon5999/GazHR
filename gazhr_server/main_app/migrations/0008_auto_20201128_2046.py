# Generated by Django 3.1.3 on 2020-11-28 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0007_candidate_scenario_step'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vacancy2resume',
            name='score',
            field=models.FloatField(default=0.0, help_text='Сompliance score'),
        ),
    ]
