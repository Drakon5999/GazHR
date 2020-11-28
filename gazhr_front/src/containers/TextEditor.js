import {Form} from 'react-bootstrap';

function TextEditor({value, onChange, name, onChangeName}) {
  return (
    <>
    <Form.Control
      className="mb-2"
      placeholder={'Имя вакансии'}
      value={name}
      onChange={(event) => onChangeName(event.target.value)}
    />
    <Form.Control
      className="mb-2"
      as="textarea"
      rows={10}
      placeholder={'Введите требования к соискателю'}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    </>
  );
}

export default TextEditor;
