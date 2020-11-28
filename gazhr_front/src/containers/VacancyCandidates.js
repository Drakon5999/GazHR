import {Card, ListGroup, Button} from 'react-bootstrap';
import {CandidateScore} from '../components';

const NextStepIcon = () => (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-forward" fill="currentColor"
                           xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd"
        d="M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z"/>
</svg>);

const DenyIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-square" fill="currentColor"
       xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path fill-rule="evenodd"
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const OtherVacancyIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-option" fill="currentColor"
       xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd"
          d="M1 2.5a.5.5 0 0 1 .5-.5h3.797a.5.5 0 0 1 .439.26L11 13h3.5a.5.5 0 0 1 0 1h-3.797a.5.5 0 0 1-.439-.26L5 3H1.5a.5.5 0 0 1-.5-.5zm10 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
  </svg>
);

function VacancyCandidates({candidates}) {
  return (
    <Card style={{width: '100%', height: '100%'}}>
      <Card.Header>Список кандидатов</Card.Header>
      <ListGroup variant="flush">
        {candidates.map(candidate => (
          <ListGroup.Item key={`${candidate.score}${candidate.name}`} className="Candidate">
            <Button variant="outline-danger" style={{marginLeft: 5}}><DenyIcon/></Button>{' '}

            <span>{candidate.name}</span>{' '}

            <CandidateScore score={candidate.score} />{' '}

            <Button variant="outline-info"  style={{marginLeft: 5}}><OtherVacancyIcon/></Button>
            <Button variant="outline-success" style={{marginRight: 5}}><NextStepIcon /></Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default VacancyCandidates;
