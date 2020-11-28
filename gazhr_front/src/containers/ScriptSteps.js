import {Col, Form, Row} from 'react-bootstrap';
import React, {useState} from 'react';

function ScriptSteps({steps}) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Row>
      <Col className="text-left">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {Array(steps).fill('').map((a, index) => (
            <Form.Row>
              <Form.Row as={Col} sm={9} className="FormStep">
                <h4>Шаг {index + 1}</h4>

                <Form.Group controlId={`exampleForm.ControlInput1${index}`}>
                  <Form.Control type="text" placeholder="Название"/>
                </Form.Group>

                <Form.Group controlId={`exampleForm.ControlTextarea1${index}`}>
                  <Form.Control as="textarea" placeholder="Автоответ при отклонения"/>
                </Form.Group>

                <Form.Group controlId={`exampleForm.ControlTextarea2${index}`}>
                  <Form.Control as="textarea" placeholder="Автоответ при переходе на следующий шаг"/>
                </Form.Group>
              </Form.Row>

              <Form.Row as={Col} sm={3} className="FormStepSecondPart">
                <Form.Group controlId={`formHorizontalCheck${index}`}>
                    <Form.Check label="Собеседвание" />
                </Form.Group>

                <Form.Group controlId={`FormStepFile${index}`}>
                  <Form.File
                    className="position-relative"
                    required
                    name="file"
                    label="Тестовое задание"
                    id="validationFormik107"
                    feedbackTooltip
                  />
                </Form.Group>
              </Form.Row>
            </Form.Row>
          ))}
        </Form>
      </Col>
    </Row>
  )
}

export default ScriptSteps;
