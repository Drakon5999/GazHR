import {Col, Form, Row, Button, Spinner} from 'react-bootstrap';
import React, {useCallback, useRef, useState} from 'react';
import {api} from '../services';
import {useHistory} from 'react-router-dom';
import to from 'await-to-js';

function ScriptSteps({steps}) {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const formRef = useRef(null)

  const handleSubmit = useCallback(async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const data = [{}];
    let name = '';

    let isValid = true;

    for (let i in form) {
      if (!isNaN(i)) {
        if (i === '0') {
          name = form[i].value;
          isValid = isValid && !!form[i].value.length;
        }

        if (i !== '0' && form[i].type !== 'submit') {
          if (form[i].name === 'file') {
            data.push({});
          } else if (form[i].id.includes('StepName')) {
            data[data.length - 1]['step_name'] = form[i].value;
            isValid = isValid && !!form[i].value.length;
          } else if (form[i].id.includes('TextDeny')) {
            data[data.length - 1]['text_deny'] = form[i].value;
            isValid = isValid && !!form[i].value.length;
          } else if (form[i].id.includes('TextNextStep')) {
            data[data.length - 1]['text_next_step'] = form[i].value;
            isValid = isValid && !!form[i].value.length;
          } else if (form[i].id.includes('Meeting')) {
            data[data.length - 1]['is_meeting'] = form[i].checked;
          }
        }
      }
    }

    data.pop();

    if (isValid) {
      setLoading(true);
      const [error] = await to(api.setScript(name, data));
      setLoading(false);

      if (error) return;
      history.push('/vacancy');
    }
  }, [history]);

  return (
    <Row>
      <Col className="text-left">
        <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId={`exampleForm.NameScript`}>
            <Form.Control type="text" placeholder="Имя сценария" required/>
          </Form.Group>

          {Array(steps).fill('').map((a, index) => (
            <Form.Row>
              <Form.Row as={Col} sm={9} className="FormStep">
                <h4>Шаг {index + 1}</h4>

                <Form.Group controlId={`exampleForm.StepName${index}`}>
                  <Form.Control type="text" placeholder="Имя шага" required/>
                </Form.Group>

                <Form.Group controlId={`exampleForm.TextDeny${index}`}>
                  <Form.Control as="textarea" placeholder="Автоответ при отклонения" required/>
                </Form.Group>

                <Form.Group controlId={`exampleForm.TextNextStep${index}`}>
                  <Form.Control as="textarea" placeholder="Автоответ при переходе на следующий шаг" required/>
                </Form.Group>
              </Form.Row>

              <Form.Row as={Col} sm={3} className="FormStepSecondPart">
                <Form.Group controlId={`exampleForm.Meeting${index}`}>
                    <Form.Check label="Собеседвание" />
                </Form.Group>

                <Form.Group controlId={`exampleForm.File${index}`}>
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
          <Button type="submit">{isLoading ? <Spinner animation="border" variant="primary" /> : 'Создать'}</Button>
        </Form>
      </Col>
    </Row>
  )
}

export default ScriptSteps;
