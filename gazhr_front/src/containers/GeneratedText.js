import {Card} from 'react-bootstrap';

function GeneratedText({text}) {
  return (
      <Card.Body className={"GeneratedText"}>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
  );
}

export default GeneratedText;
