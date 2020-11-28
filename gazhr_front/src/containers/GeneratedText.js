import {Card} from 'react-bootstrap';

function GeneratedText({text}) {
  return (
    <Card bg="light" className="GeneratedText">
      <Card.Body>
        <Card.Text>
          {text || 'Заявка на вакансию'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GeneratedText;
