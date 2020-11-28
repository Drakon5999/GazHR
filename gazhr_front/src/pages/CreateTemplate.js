import {Container, Row, Col, Button, Spinner, Alert, Form} from 'react-bootstrap';
import {TextEditor, GeneratedText} from '../containers';
import {RecommendSet} from '../components';
import {api} from '../services';
import React, {useState, useRef} from 'react';
import to from 'await-to-js';
import {Helmet} from "react-helmet";
import {GoBackButton} from '../components';

function CreateVacancy() {
  const [text, setText] = useState('');

  return (
    <>
      <Helmet>
        <title>Создание шаблона резюме</title>
      </Helmet>

      <Container>
        <Row className="Header mb-2">
          <Col className="text-right">
            <GoBackButton/>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Control
              className="mb-2"
              as="textarea"
              rows={10}
              placeholder={'Введите требования к соискателю'}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button>Сохранить</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateVacancy;
