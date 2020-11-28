import datetime

from django.core.management.base import BaseCommand

from main_app.models import Scenario, Candidate, Resume, Task, Vacancy, Vacancy2Resume


class Command(BaseCommand):
    help = "Load data"

    def handle(self, *args, **options):
        c1 = Candidate(
            full_name="Андрей Иванов",
            created_timestamp=datetime.datetime.now(),
            addition_info={
                "должность": "Java программист",
                "опыт": "2 года",
                "ЗП": "2 доширака"
            },
        )
        c1.save()
        c2 = Candidate(
            full_name="Ренат Рахматулин",
            created_timestamp=datetime.datetime.now(),
            addition_info={
                "должность": "TeamLead",
                "опыт": "100500 года",
                "ЗП": "300к"
            },
        )
        c2.save()
        c3 = Candidate(
            full_name="Вася Пупкин",
            created_timestamp=datetime.datetime.now(),
            addition_info={
                "должность": "Менеджер",
                "опыт": "1 года",
                "ЗП": "70к"
            },
        )
        c3.save()
        r1 = Resume(
            candidate_id=c1,
            text="Возмите меня куда нибудь, я не ел уже неделю",
            tags={
                "languages": ["Java", "English"],
                "tools": ["Компьютер"],
            },
            status="В рассмотрении",
            created_timestamp=datetime.datetime.now()
        )
        r1.save()
        r2 = Resume(
            candidate_id=c2,
            text="Поднял уже 3 компании",
            tags={
                "languages": ["English"],
                "tools": ["Компьютер"],
                "age": 23,
            },
            status="Принять кандидата",
            created_timestamp=datetime.datetime.now()
        )
        r2.save()
        r3 = Resume(
            candidate_id=c3,
            text="Хочу в банк",
            tags={
                "tools": ["Компьютер"],
            },
            status="Берем",
            created_timestamp=datetime.datetime.now()
        )
        r3.save()
        s1 = Scenario(
            created_timestamp=datetime.datetime.now(),
            json_scenario={
                1: "Реши упражнение 1"
            }
        )
        s1.save()
        t1 = Task(
            name="Простое задание: 2+3?",
            task_file=None,
            created_timestamp=datetime.datetime.now(),
        )
        t1.save()
        v1 = Vacancy(
            name="Программист C++",
            source_text="Нужен плюсовика",
            transformed_text="В нашу компанию нужен C++ разработчик",
            created_timestamp=datetime.datetime.now(),
            finished_timestamp=datetime.datetime.now(),
            scenario_id=s1,
            task_id=t1,
        )
        v1.save()
        v2r1 = Vacancy2Resume(
            vacancy_id=v1,
            resume_id=r1,
            score=0.7,
            created_timestamp=datetime.datetime.now()
        )
        v2r1.save()
        v2r2 = Vacancy2Resume(
            vacancy_id=v1,
            resume_id=r2,
            score=0.5,
            created_timestamp=datetime.datetime.now()
        )
        v2r2.save()
        v2r3 = Vacancy2Resume(
            vacancy_id=v1,
            resume_id=r3,
            score=0.3,
            created_timestamp=datetime.datetime.now()
        )
        v2r3.save()
