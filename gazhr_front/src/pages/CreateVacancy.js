import {Container, Row, Col, Button, Spinner, Alert} from 'react-bootstrap';
import {TextEditor, GeneratedText} from '../containers';
import {RecommendSet} from '../components';
import {api} from '../services';
import React, {useState, useRef} from 'react';
import to from 'await-to-js';
import {Helmet} from "react-helmet";
import {GoBackButton} from '../components';

const useUserEdit = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [suggests, setSuggests] = useState(['']);
  const [isCreating, setCreating] = useState(false);
  const timerId = useRef(0);

  const onChange = (value) => {
    setText(value);
    timerId.current && clearTimeout(timerId.current);
    timerId.current = setTimeout(async () => {
      setCreating(true);
      const [error, data] = await to(api.generateText(value));
      if (!error && data) {
        setGeneratedText(data?.data?.description || '');
        setSuggests(data?.data?.suggests || ['']);
      }
      setCreating(false);
    }, 1500);
  }

  const clear = () => {
    setText('');
    setGeneratedText('');
    setName('');
    setSuggests(['']);
    timerId.current && clearTimeout(timerId.current);
  }

  return [text, onChange, name, setName, suggests, generatedText, isCreating, clear]
};

function CreateVacancy() {
  const [text, onChange, name, setName, suggests, generatedText, isCreating, clear] = useUserEdit();
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (name, text) => {
    if (!generatedText) {
      setShowError(true);
      return;
    }
    setLoading(true);
    const [error, data] = await to(api.submitDescription(name, text));

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
        <Row className="Header mb-2">
          <Col className="text-right">
            <GoBackButton />
          </Col>
        </Row>


        {showError && (
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Ууууупс!</Alert.Heading>
            <p>
              Мне кажется Вы хотети создать вакансию без данных
            </p>
          </Alert>
        )}

        <Row className={"form"}>
          <Col sm={8}>
            <Row>
              <TextEditor value={text} onChange={onChange} name={name} onChangeName={setName}/>
            </Row>

            <Row>
              <GeneratedText text={generatedText} isLoading={isCreating}/>
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
            onClick={() => handleSubmit(name, generatedText)}>
            {!isLoading ? 'Создать' : <Spinner animation="border" size="sm"/>}
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default CreateVacancy;
