import datetime


def create_scenario(apps, schema_editor):
    Scenario = apps.get_model("main_app", "Scenario")
    s1 = Scenario()
    s1.json_scenario = {}
    s1.created_timestamp = datetime.datetime.now().timestamp()
    s1.save()
