import {Col, Container, Button, Row} from 'react-bootstrap';
import {VacancyMinimized} from '../containers';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import to from 'await-to-js';
import {GoBackButton, EmptyVacancies} from '../components';
import {api} from '../services';
import {Link} from 'react-router-dom';

const defaultVacancy = {job_name:'Разработчик JS', job_description: 'Очень рочно требуется разбраточки NodeJS', job_status:''};

function VacancyList() {
  const [vacancies, setVacancies] = useState([defaultVacancy]); //TODO удалить значение

  const getVacancies = async () => {
    const [error, data] = await to(api.getJobsList());
    if (error) return;

    data?.jobs && setVacancies([defaultVacancy, ...data.jobs]);
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
        <Row className="Header justify-content-between mb-2">
          <Col className="text-left">
            <Link to={'/create-vacancy'}>
              <Button variant="success">Создать вакансию</Button>
            </Link>
          </Col>

          <Col className="text-right">
            <GoBackButton/>
          </Col>
        </Row>

        {vacancies.length ? vacancies.map(({job_name, scenario_id, job_description, job_id, job_status}) => {
          return <VacancyMinimized key={job_name} description={job_description} scriptId={scenario_id} id={job_id} title={job_name} />
        }) : <EmptyVacancies />}
      </Container>
    </>
  );
}

export default VacancyList;
