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
            text="""Стек: Java, C++11, ООП, STL.
Базовые знания: Qt, SQLite, MySQL, Git, Паттерны.
Английский уровня pre- intermidiate; Повышаю знания на курсах в данное время.
Для меня важно быть технически эрудированным в своей области, иметь возможность развиваться в рабочем процессе, карьерный рост.
Целеустремлен в своем желании стать программистом и в личностном развитии в этой сфере.
К переезду финансово готов, без задержек.
            """,
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
            text="Поднял уже 3 IT компании со стеком hadoop, kafka, python",
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
            text="Ничего не умею кроме Python, Java и JS",
            tags={
                "tools": ["Нету"],
            },
            status="Берем",
            created_timestamp=datetime.datetime.now()
        )
        r3.save()
        s1 = Scenario(
            created_timestamp=datetime.datetime.now(),
            json_scenario=[{
                "step_name": "\u0420\u0430\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0435 \u0440\u0435\u0437\u044e\u043c\u0435",
                "text_deny": "\u041f\u043e\u043a\u0430 \u043f\u043e\u043a\u0430",
                "is_meeting": False,
                "text_next_step": "\u041f\u0440\u0438\u0432\u0435\u0442"
            }, {
                "step_name": "\u0422\u0435\u0441\u0442\u043e\u0432\u043e\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435",
                "text_deny": "\u0427\u0442\u043e-\u0442\u043e \u043d\u0435 \u043e\u0447\u0435\u043d\u044c",
                "is_meeting": False,
                "text_next_step": "\u041e \u0441\u043d\u043e\u0432\u0430 \u0442\u044b"
            }, {
                "step_name": "\u0421\u043e\u0431\u0435\u0441\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435",
                "text_deny": "\u041d\u0443 \u0442\u0430\u043a \u0441\u0435\u0431\u0435",
                "is_meeting": True,
                "text_next_step": "\u041f\u0440\u0438\u0432\u0435\u0442 \u0438 \u0434\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c"
            }]
        )
        s1.save()
        t1 = Task(
            name="Простое задание: 2+3?",
            task_file=None,
            created_timestamp=datetime.datetime.now(),
        )
        t1.save()
        v1 = Vacancy(
            name="Программист Java",
            source_text="Нужен разработчик java",
            transformed_text="В нашу компанию нужен инженер-программист с навыками в создании прикладного ПО на Java. Требования: \n1) профессиональное знание Java; \n2) умение грамотно и структурировано составлять исходный код ПО; \n3) Способность разбираться в чужом коде;",
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
        v1 = Vacancy(
            name="Мобильный full-stack разработчик",
            source_text="Нужен разработчик мобильных приложений",
            transformed_text="""
Требуемый опыт работы: 3–6 лет

Полная занятость, удаленная работа

Технологический стек:

    Java 11;
    Spring;
    Angular;
    PostgreSQL / MySQL;
    Liquibase;
    JIRA.

Плюсом будет:

    Опыт работы c СI/СD;
    Опыт работы с RabbitMQ;
    Опыт работы с MongoDB, Redis;
    Опыт написания модульных и интеграционных тестов;
    Знание современных инженерных практик включая код ревью, работу с системами контроля версий, сборки, тестирования и тд.

Обязанности:

    Ваша деятельность будет связана с frontend и backend разработкой
    Поддержка тестового покрытия кода
    Ведение проектной документации

Требования:

    Опыт разработки backend на Java / Spring Boot минимум 3 года;
    Умение писать SQL-запросы;
    Высшее образование (техническое);
    Возможность и желание работать удаленно.

Условия:

    Стабильная заработная плата;
    Перспективы профессионального и карьерного роста;
    Удаленная работа.

        """,
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
