import {Card, ListGroup} from 'react-bootstrap';

function VacancyCandidates({candidates}) {
  return (
    <Card style={{width: '100%', height: '100%'}}>
      <Card.Header>Список кандидатов</Card.Header>
      <ListGroup variant="flush">
        {candidates.map(candidate => <ListGroup.Item key={candidate}>{candidate}</ListGroup.Item>)}
      </ListGroup>
    </Card>
  );
}

export default VacancyCandidates;
