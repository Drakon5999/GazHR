import datetime

from django.core.management.base import BaseCommand

from main_app.models import Scenario


class Command(BaseCommand):
    help = "Load data"

    def handle(self, *args, **options):
        s = Scenario(json_scenario={},
                     created_timestamp=datetime.datetime.now())
        print(s)
        s.save()
