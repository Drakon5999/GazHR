import {Container, Row, Col, Button} from 'react-bootstrap';
import {TextEditor, GeneratedText, RecommendSet} from '../containers';
import React, {useState} from 'react';

function CreateVacancy() {
  const [text, setText] = useState('');

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>Создание вакансии</h1>
      </Row>

      <Row className={"form"}>
        <Col sm={8}>
          <Row>
            <TextEditor value={text} onChange={setText} />
          </Row>

          <Row>
            <GeneratedText text={'Сгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текстСгенерированный текст'} />
          </Row>
        </Col>

        <Col sm={4}>
           <RecommendSet items={['Информация об опыте работы', 'Требуемые навыки']}/>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Button variant="success">Отправить</Button>
      </Row>
    </Container>
  );
}

export default CreateVacancy;
