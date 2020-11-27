import {Container, Row, Col, Button, Spinner} from 'react-bootstrap';
import {TextEditor, GeneratedText, RecommendSet} from '../containers';
import {api} from '../services';
import React, {useState, useRef} from 'react';
import to from 'await-to-js';
import {Helmet} from "react-helmet";
import {GoBackButton} from '../components';

const useUserEdit = () => {
  const [text, setText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [suggests, setSuggests] = useState([]);
  const timerId = useRef(0);

  const onChange = (value) => {
    setText(value);
    timerId.current && clearTimeout(timerId.current);
    timerId.current = setTimeout(async () => {
      const [error, data] = await to(api.generateText());
      if (!error && data) {
        setGeneratedText(data.description);
        setSuggests(data.suggests);
      }
    }, 3000);
  }

  const clear = () => {
    setText('');
    setGeneratedText('');
    setSuggests([]);
    timerId.current && clearTimeout(timerId.current);
  }

  return [text, onChange, suggests, generatedText, clear]
};

function CreateVacancy() {
  const [text, onChange, suggests, generatedText, clear] = useUserEdit();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (text) => {
    setLoading(true);
    const [error, data] = await to(api.submitDescription(text));

    setLoading(false);
    if (error || !data.job_id) return;

    clear();
  };

  return (
    <>
      <Helmet>
        <title>Создание вакансии</title>
      </Helmet>

      <Container>
        <GoBackButton />

        <Row className={"form"}>
          <Col sm={8}>
            <Row>
              <TextEditor value={text} onChange={onChange}/>
            </Row>

            <Row>
              <GeneratedText text={generatedText}/>
            </Row>
          </Col>

          <Col sm={4}>
            <RecommendSet items={suggests}/>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Button
            disabled={isLoading}
            variant="success"
            onClick={() => handleSubmit(generatedText)}>
            {!isLoading ? 'Создать' : <Spinner animation="border" size="sm"/>}
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default CreateVacancy;
