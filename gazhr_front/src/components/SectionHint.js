import {Button, Card} from 'react-bootstrap';
import React from 'react';
import {useHistory} from 'react-router';

function SectionHint ({title, text, buttonText, link}) {
  const history = useHistory();

  return (
    <Card className={"SectionHint mb-2"}>
      <Card.Body className={"SectionHintBody"}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={"textSection"}>{text}</Card.Text>
        <Button variant="primary" onClick={() => history.push(link)} style={{alignSelf: 'center'}}>{buttonText}</Button>
      </Card.Body>
    </Card>
  )
}

export default SectionHint;
