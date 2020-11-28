import {Container, Row, Badge} from 'react-bootstrap';
import React from 'react';
import {Helmet} from "react-helmet";
import {SectionHint} from '../components';

function VacancyList() {
  const customerFeatures = [
    {
      title: 'Список ваканский',
      text: 'Отображается список ранее созданных вакансий и ход работы над ними.',
      buttonText: 'Показать список',
      link: './vacancy-customer',
    },
    {
      title: 'Создание вакансий',
      text: 'Создание заявка на нового сотрудника в свободной форме с подсказками.',
      buttonText: 'Создать',
      link: './create-vacancy-customer',
    },
  ];

  const hrFeatures = [
    {
      title: 'Список ваканский',
      text: 'Отображение всех активных заявок',
      buttonText: 'Показать список',
      link: './vacancy',
    },
    {
      title: 'Создание вакансий',
      text: 'Создание заявка на нового сотрудника в свободной форме с подсказками.',
      buttonText: 'Создать',
      link: './create-vacancy',
    },
    {
      title: 'Список соискателей',
      text: 'Список свободных агентов, готовых откликнуться на вакансию',
      buttonText: 'Показать список',
      link: './candidate',
    },
    {
      title: 'Создание сценарция',
      text: 'Создвание сценария для ведения кандидатов по вакансии',
      buttonText: 'Создать',
      link: './create-script',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Газ HR</title>
      </Helmet>

      <Container>
        <Row className="mb-2">
          <Badge variant="dark">Заказчик вакансий</Badge>
        </Row>

        <Row className="mb-2">
          {customerFeatures.map(feature => <SectionHint key={feature.title} {...feature} />)}
        </Row>

        <Row className="mb-2">
          <Badge variant="dark">Сотрудник HR</Badge>
        </Row>

        <Row className="mb-2">
          {hrFeatures.map(feature => <SectionHint key={feature.title} {...feature} />)}
        </Row>
      </Container>
    </>
  );
}

export default VacancyList;
