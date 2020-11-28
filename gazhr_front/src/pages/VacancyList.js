import {Col, Container, Button, Row} from 'react-bootstrap';
import {VacancyMinimized} from '../containers';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import to from 'await-to-js';
import {GoBackButton} from '../components';
import {api} from '../services';
import {Link} from 'react-router-dom';

function VacancyList() {
  const [vacancies, setVacancies] = useState([{
    job_name: 'строка',
    job_description: 'обрезанное описание',
    job_id: 1,
    job_status: 'light',
  },
    {
      job_name: 'строка 2',
      job_description: 'обрезанное описание',
      job_id: 2,
      job_status: 'warning',
    }]); //TODO удалить значение

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

        {vacancies.map(({job_name, job_description, job_id, job_status}) => {
          return <VacancyMinimized key={job_name} description={job_description} title={job_name} id={job_id} status={job_status} />
        })}
      </Container>
    </>
  );
}

export default VacancyList;
