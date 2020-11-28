import {Button, Card, Col, Row} from 'react-bootstrap';
import React from 'react';
import {Link} from 'react-router-dom';

function VacancyMinimized({description, title, id, status, handleClick}) {
  return (
    <Row>
      <Col>
        <Card bg={status} className="text-left mb-2">
          <Card.Header as="h5">{title}</Card.Header>
          <Card.Body>
            <Card.Text>
              {description}
            </Card.Text>
            <Link to={`/vacancy/${id}`}><Button variant="primary" className="align-self-end">Подробнее</Button></Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default VacancyMinimized;
