import {Col, Container, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useParams} from 'react-router-dom';
import to from 'await-to-js';
import {GoBackButton, VacancyText} from '../components';
import {VacancyStep} from '../containers';
import {api} from '../services';
import EmptyVacancy from '../components/EmptyVacancy';

function Vacancy({}) {
  const [vacancy, setVacancy] = useState({});
  const [scriptSteps, setScriptSteps] = useState([]);
  const [isShowError, setShowError] = useState(false);

  let {id} = useParams();

  const refresh = async () => {
    const [error, res] = await to(api.getJobFullInfo(id));
    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

    if (error) {
      setShowError(true);
      return;
    }
    setVacancy(data);

    const [errorScript, resScript] = await to(api.getScript(data.scenario_id));
    if (errorScript) return;
    setScriptSteps(resScript.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleNextStep = async (candidateId) => {
    const [error] = await to(api.goToNextStep(candidateId));
    if (error) return;

    refresh();
  };

  const handleDeny = async (candidateId) => {
    const [error] = await to(api.denyCandidate(id, candidateId));
    if (error) return;

    refresh();
  };

  const handleOtherJob = async (candidateId) => {
    const [error] = await to(api.goToOtherJob(candidateId));
    if (error) return;

    refresh();
  };

  return (
    <>
      <Helmet>
        <title>{vacancy?.job_name || 'Вакансия'}</title>
      </Helmet>

      <Container>
        <Row className="Header mb-2">
          <Col className="text-right">
            <GoBackButton/>
          </Col>
        </Row>


        <Row>
          {!isShowError ? (
              <>
                <VacancyText text={vacancy?.transformed_text} />

                <Col>
                  <h4>Путь к трудоустройству</h4>
                  {scriptSteps?.map((step, index) => {
                    return <VacancyStep
                      title={step.step_name}
                      isMeeting={step.is_meeting}
                      candidates={vacancy.candidates.filter(a => a.step === index)}
                      handleNextStep={handleNextStep}
                      handleDeny={handleDeny}
                      handleOtherJob={handleOtherJob}
                    />
                  })}
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
