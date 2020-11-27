import {Container, Row} from 'react-bootstrap';
import React from 'react';
import {Helmet} from "react-helmet";
import {GoBackButton} from '../components';
import {useParams} from 'react-router-dom';

function VacancyList() {
  let {id} = useParams();

  return (
    <>
      <Helmet>
        <title>Вакансий</title>
      </Helmet>

      <Container>
        <Row>
          <GoBackButton />
        </Row>

        <Row>
          <div>Дата айди: {id}</div>
        </Row>
      </Container>
    </>
  );
}

export default VacancyList;
