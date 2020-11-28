import {Alert} from 'react-bootstrap';
import React from 'react';

function EmptyVacancies () {
  return (
    <Alert variant="secondary">В данный момент активных заявок нет, добавьте вакансия, чтобы тут что-нибудь появилось</Alert>
  )
}

export default EmptyVacancies;
