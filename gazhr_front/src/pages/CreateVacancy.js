import {Container, Row, Col, Button, Spinner, Alert} from 'react-bootstrap';
import {TextEditor, GeneratedText, RecommendSet} from '../containers';
import {api} from '../services';
import React, {useState, useRef} from 'react';
import to from 'await-to-js';
import {Helmet} from "react-helmet";
import {GoBackButton} from '../components';

const useUserEdit = () => {
  const [text, setText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [suggests, setSuggests] = useState(['Текст']);
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
    setSuggests(['Текст']);
    timerId.current && clearTimeout(timerId.current);
  }

  return [text, onChange, suggests, generatedText, clear]
};

function CreateVacancy() {
  const [text, onChange, suggests, generatedText, clear] = useUserEdit();
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (text) => {
    if (!generatedText) {
      setShowError(true);
      return;
    }
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
        {showError && (
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Ууууупс!</Alert.Heading>
            <p>
              Мне кажется Вы хотети создать вакансию без данных
            </p>
          </Alert>
        )}

        <Row className="mb-2">
          <Col className="text-right">
            <GoBackButton />
          </Col>
        </Row>

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
