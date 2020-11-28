import {Modal, Button, Card, Col, Row} from 'react-bootstrap';
import React, {useCallback, useState} from 'react';
import {api} from '../services';
import {useHistory} from 'react-router-dom';

function VacancyMinimized({description, title, id, status}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  };

  const history = useHistory();
  const handleRemove = useCallback(() => {
    setShow(false);
    api.removeJob(id)
  }, [history]);

  return (
    <Row>
      <Col>
        <Card bg={status} className="text-left mb-2" onClick={() => setShow(true)}>
          <Card.Header as="h5">{title}</Card.Header>
          <Card.Body>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleRemove}>Отменить заявку</Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default VacancyMinimized;
