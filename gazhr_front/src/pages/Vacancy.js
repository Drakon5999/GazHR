import {Col, Container, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useParams} from 'react-router-dom';
import to from 'await-to-js';
import {GoBackButton, VacancyText} from '../components';
import {VacancyCandidates} from '../containers';
import {api} from '../services';
import EmptyVacancy from '../components/EmptyVacancy';

function Vacancy({}) {
  const [vacancy, setVacancy] = useState({
    job_name: 'строка',
    job_description: 'обрезанное описанио',
    job_id: 'число',
    scenario_id: 'привязанный сценарий, число',
    candidates: [
      {
        name: 'Иванов Иван Иванович',
        score: 99,
        candidate_id: 'число',
        status: 'поле в котором можно хранить на каком сейчас этапе кандидат, для сценариев',
      },
      {
        name: 'Петров Петр Петрович',
        score: 23,
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
        // setShowError(true);
        return;
      }
      // setVacancy(data);
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
        <Row className="mb-2">
          <Col className="text-right">
            <GoBackButton/>
          </Col>
        </Row>


        <Row>
          {!isShowError ? (
              <>
                <VacancyText>{vacancy.job_description || 'Описание'}</VacancyText>

                <Col>
                  <VacancyCandidates candidates={vacancy.candidates || []} handleNextStep={handleNextStep}
                                     handleDeny={handleDeny}/>
                </Col>
              </>
            ) : (
              <Col><EmptyVacancy /></Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Vacancy;
