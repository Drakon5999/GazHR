import {Alert, Col, Container, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useParams} from 'react-router-dom';
import to from 'await-to-js';
import {GoBackButton} from '../components';
import {VacancyCandidates} from '../containers';
import {api} from '../services';

function Vacancy({}) {
  const [vacancy, setVacancy] = useState({
    job_name: 'строка',
    job_description: 'обрезанное описанио',
    job_id: 'число',
    scenario_id: 'привязанный сценарий, число',
    candidates: ''[
      {
        name: 'ФИО',
        score: 'число',
        candidate_id: 'число',
        status: 'поле в котором можно хранить на каком сейчас этапе кандидат, для сценариев',
      }
      ],
    test_files: ''[
      {
        name: 'название файл',
        test_file_url: 'url файл',
      }
      ]

  });
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
            <GoBackButton/>
          </Col>
        </Row>

        <Row>
          <Col><p>{vacancy.job_description || 'Описание'}</p></Col>

          <Col>
            <VacancyCandidates candidates={vacancy.candidates || []} handleNextStep={handleNextStep}
                               handleDeny={handleDeny}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Vacancy;
