import {Card, ListGroup, Button} from 'react-bootstrap';

function VacancyCandidates({candidates}) {
  return (
    <Card style={{width: '100%', height: '100%'}}>
      <Card.Header>Список кандидатов</Card.Header>
      <ListGroup variant="flush">
        {candidates.map(candidate => (
          <ListGroup.Item key={`${candidate.score}${candidate.name}`}>
            <span>{candidate.name}</span>
            <span>{candidate.score}</span>
            <Button>V</Button>
            <Button>X</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default VacancyCandidates;
