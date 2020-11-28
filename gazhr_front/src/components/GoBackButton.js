import {Button} from 'react-bootstrap';
import React from 'react';
import {Link, useHistory} from "react-router-dom";

export default function () {
  let history = useHistory();

  return <>
    <Button variant="link" onClick={() => history.goBack()} style={{alignSelf: 'flex-end'}}>{'< '}Назад</Button>{' '}
    <Link to="/"><Button variant="link" style={{alignSelf: 'flex-end'}}>Закрыть</Button></Link>
    </>;
}
