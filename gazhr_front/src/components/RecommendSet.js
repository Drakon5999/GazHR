import {Card, ListGroup} from 'react-bootstrap';

function RecommendSet({items}) {
  return (
    <Card style={{width: '100%', height: '100%'}}>
      <Card.Header>Рекомендуем указать</Card.Header>
      <ListGroup variant="flush">
        {items.map(item => <ListGroup.Item key={item}>{item}</ListGroup.Item>)}
      </ListGroup>
    </Card>
  );
}

export default RecommendSet;
