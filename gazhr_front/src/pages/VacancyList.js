import {Container, Row, Col, Button, Spinner} from 'react-bootstrap';
import {TextEditor, GeneratedText, RecommendSet} from '../containers';
import {api} from '../services';
import React, {useState, useRef} from 'react';
import to from 'await-to-js';
import {Helmet} from "react-helmet";

function VacancyList() {
  return (
    <>
      <Helmet>
        <title>Список вакансий</title>
      </Helmet>

      <Container>

      </Container>
    </>
  );
}

export default VacancyList;
