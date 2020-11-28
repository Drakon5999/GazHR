import {Col, Container, Button, Row} from 'react-bootstrap';
import {VacancyMinimized} from '../containers';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import to from 'await-to-js';
import {GoBackButton, EmptyVacancies} from '../components';
import {api} from '../services';
import {Link} from 'react-router-dom';

function VacancyList() {
  const [vacancies, setVacancies] = useState([{job_name:'test', job_description: 'sndfjasdf', job_status:'warning'}]); //TODO удалить значение

  const getVacancies = async () => {
    const [error, data] = await to(api.getJobsList());
    if (error) return;

    data?.jobs && setVacancies(data.jobs);
  };


  useEffect(() => {
    getVacancies();

    const refreshInterval = 10000;
    const intervalID = setInterval(getVacancies, refreshInterval);

    return () => {
      clearInterval(intervalID);
    };
  }, [])

  return (
    <>
      <Helmet>
        <title>Список вакансий</title>
      </Helmet>

      <Container>
        <Row className="justify-content-between mb-2">
          <Col className="text-left">
            <Link to={'/create-vacancy'}>
              <Button variant="success">Создать вакансию</Button>
            </Link>
          </Col>

          <Col className="text-right">
            <GoBackButton/>
          </Col>
        </Row>

        {vacancies.length ? vacancies.map(({job_name, job_description, job_id, job_status}) => {
          return <VacancyMinimized key={job_name} description={job_description} title={job_name} />
        }) : <EmptyVacancies />}
      </Container>
    </>
  );
}

export default VacancyList;
