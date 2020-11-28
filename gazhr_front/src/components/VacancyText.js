import React from 'react';
import {Card, Col} from 'react-bootstrap';

function VacancyText({text}) {
  return (
    <Col>
      <Card bg="light" className="GeneratedText">
      <Card.Body>
        <Card.Text className="text-left">
          {text || 'Текст вакансии'}
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
  );
}

export default VacancyText;
