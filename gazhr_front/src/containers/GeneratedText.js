import {Card, Spinner} from 'react-bootstrap';

function GeneratedText({text, isLoading}) {
  return (
    <Card bg="light" className="GeneratedText">
      <Card.Body>
        <Card.Text>
          {isLoading ? <Spinner animation="border" variant="success" /> : text || 'Заявка на вакансию'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GeneratedText;
