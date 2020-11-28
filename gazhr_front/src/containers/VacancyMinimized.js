import {Spinner, Button, Card, Col, Row, Modal} from 'react-bootstrap';
import React, {useCallback, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import to from 'await-to-js';
import {api} from '../services';

const PlayIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-play-fill" fill="currentColor"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-share" fill="currentColor"
       xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
          d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
  </svg>
);

const defaultScript = {scenario_id: 0, name: 'JS разработчик'};

function VacancyMinimized({description, title, id, status, scriptId}) {
  const [isShowModalWithScript, setShowModalWithScript] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [scripts, setScripts] = useState([defaultScript]);
  const [isLoadingScripts, setLoadingScripts] = useState(false);
  const [isLoadingShare, setLoadingShare] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isShowModalWithScript) {
      setLoadingScripts(true);
      (async () => {
        const [error, res] = await to(api.getScripts());
        setLoadingScripts(false);
        if (error) return;

        setScripts(res?.data?.all_scenarios || [defaultScript]);
      })();
    }
  }, [isShowModalWithScript]);

  const handlePlay = useCallback(async (scriptId) => {
      const [error] = await to(api.bindScriptToVacancy(id, scriptId));
      if (error) return;

      history.push(`/vacancy/${id}`);
  }, [history]);

  const handleCloseShare = () => {
    setShowShare(false);
  }


  return (
    <Row>
      <Col>
        <Card bg={status} className="text-left mb-2">
          <Card.Header as="h5">{title || 'Без имени'}</Card.Header>
          <Card.Body>
            <Card.Text>
              {description}
            </Card.Text>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
              <span>
                <Link to={`/vacancy/${id}`}><Button variant="primary" className="align-self-end">Подробнее</Button></Link>{' '}
                {!scriptId && (
                  <>
                    <Link to={`/create-script`}><Button variant="outline-primary" className="align-self-end">Создать сценарий</Button></Link>{' '}
                    <Button variant="outline-primary" className="align-self-end" onClick={() => setShowModalWithScript(true)}>Выбрать сценарий</Button>
                  </>
                )}
              </span>

              <Button variant="outline-success" onClick={() => {
                setShowShare(true);
              }}>{isLoadingShare ? <Spinner animation="border" variant="danger" size="sm"/> : <ShareIcon/>}</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {isShowModalWithScript && (
        <Modal
          size="lg"
          show={isShowModalWithScript}
          onHide={() => setShowModalWithScript(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Выберите сценарий для вакансии - {title || 'Без имени'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoadingScripts ? <Spinner animation="border" variant="primary" /> :
              scripts.map(script => {
                return (
                  <Row className="mb-2">
                    <Col className="">
                      <Button variant="outline-success" onClick={() => handlePlay(script.scenario_id)}>
                        <PlayIcon />
                      </Button>
                      <span style={{marginLeft: '20px'}}>{script.name}</span>
                    </Col>
                  </Row>
                )
              })
            }
          </Modal.Body>
        </Modal>
      )}

      <Modal show={showShare} size="lg" onHide={handleCloseShare}>
        <Modal.Header closeButton>
          <Modal.Title>Размещение заявки на сервисах</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant="success" onClick={handleCloseShare}>HeadHunter <ShareIcon/></Button>{' '}
            <Button variant="success" onClick={handleCloseShare}>LinkedIn <ShareIcon /></Button>
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default VacancyMinimized;
