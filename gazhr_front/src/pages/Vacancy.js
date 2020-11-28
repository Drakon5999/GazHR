import {Alert, Col, Container, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useParams} from 'react-router-dom';
import to from 'await-to-js';
import {GoBackButton} from '../components';
import {VacancyCandidates} from '../containers';
import {api} from '../services';

function Vacancy({}) {
  const [vacancy, setVacancy] = useState({});
  const [isShowError, setShowError] = useState(false);

  let {id} = useParams();

  useEffect(() => {
    (async () => {
      const [error, data] = await to(api.getJobFullInfo(id));
      if (error) {
        setShowError(true);
        return;
      }
      setVacancy(data);
    })()
  }, []);

  const handleNextStep = (candidateId) => {

  };

  const handleDeny = (candidateId) => {

  };

  return (
    <>
      <Helmet>
        <title>{vacancy.job_name || 'Вакансия'}</title>
      </Helmet>

      <Container>
        {isShowError && (
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Ууууупс!</Alert.Heading>
            <p>Вакансия не найдена или ещё какая ошибка, мы не знаем</p>
          </Alert>
        )}

        <Row className="mb-2">
          <Col className="text-right">
            <GoBackButton />
          </Col>
        </Row>

        <Row>
          <Col><p>{vacancy.job_description || 'Описание'}</p></Col>

          <Col>
            <VacancyCandidates candidates={vacancy.candidates} handleNextStep={handleNextStep} handleDeny={handleDeny} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Vacancy;
