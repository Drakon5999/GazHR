# Generated by Django 3.1.3 on 2020-11-28 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0005_auto_20201128_1345'),
    ]

    operations = [
        migrations.AddField(
            model_name='scenario',
            name='name',
            field=models.TextField(default='', help_text='Scenario name'),
        ),
        migrations.AddField(
            model_name='vacancy',
            name='transformed_data',
            field=models.JSONField(null=True),
        ),
    ]
