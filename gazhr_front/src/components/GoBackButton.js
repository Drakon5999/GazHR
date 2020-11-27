import {Button} from 'react-bootstrap';
import React from 'react';
import {useHistory} from "react-router-dom";

export default function () {
  let history = useHistory();

  return <Button variant="link" onClick={() => history.goBack()} style={{alignSelf: 'flex-end'}}>Закрыть</Button>;
}
