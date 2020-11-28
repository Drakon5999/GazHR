import {Container, Row, Col, Button, Spinner, Form} from 'react-bootstrap';
import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import {GoBackButton} from '../components';
import {ScriptSteps} from '../containers';

function CreateScript() {
  const [isLoading, setLoading] = useState(false);
  const [steps, setSteps] = useState(1);

  const handleSubmit = () => {
    setLoading(true);
  }

  const handleNewStep = () => {
    setSteps(prev => prev + 1)
  }

  return (
    <>
      <Helmet>
        <title>Новый сценарий</title>
      </Helmet>

      <Container>
        <Row className="mb-2">
          <Col className="text-left">
            <Button variant="success" onClick={handleNewStep}>Добавить шаг</Button>
          </Col>

          <Col className="text-right">
            <GoBackButton/>
          </Col>
        </Row>

        <ScriptSteps steps={steps}/>

        <Row className="justify-content-md-center">
          <Button
            disabled={isLoading}
            variant="success"
            onClick={() => handleSubmit()}>
            {!isLoading ? 'Создать' : <Spinner animation="border" size="sm"/>}
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default CreateScript;
