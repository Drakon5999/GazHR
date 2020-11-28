import {Col, Container, Button, Row, Modal, Card} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import to from 'await-to-js';
import {GoBackButton, EmptyVacancies} from '../components';
import {api} from '../services';
import {Link} from 'react-router-dom';

function Candidates() {
  const [candidates, setCandidates] = useState([]);

  const getVacancies = async () => {
    const [error, data] = await to(api.getCandidates());
    if (error) return;

    data?.candidates && setCandidates(data.jobs);
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
        <title>Кандидаты</title>
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

        {candidates.length ? candidates.map((candidate) => {
          return (
            <Card body>{candidate.name}</Card>
          )
        }) : <EmptyVacancies/>}
      </Container>
    </>
  );
}

export default Candidates;
