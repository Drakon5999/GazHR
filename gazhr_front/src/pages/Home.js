import {Container, Row} from 'react-bootstrap';
import React from 'react';
import {Helmet} from "react-helmet";
import {SectionHint} from '../components';

function VacancyList() {
  const sections = [
    {
      title: 'Список ваканский',
      text: 'Этот раздел для заказчиков. Здесь он сможет найти ранее созданные вакансии и увидеть ход работы над ними.',
      buttonText: 'Показать список',
      link: './vacancy',
    },
    {
      title: 'Создание вакансий',
      text: 'Этот раздел для заказчиков. Здесь он сможет создать заявка на вакансию.',
      buttonText: 'Создать',
      link: './create-vacancy',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Газ HR</title>
      </Helmet>

      <Container>
        <Row>
          {sections.map(section => <SectionHint key={section.title} {...section} />)}
        </Row>
      </Container>
    </>
  );
}

export default VacancyList;
