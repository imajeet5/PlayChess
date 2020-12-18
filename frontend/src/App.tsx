import React from 'react';
import InputExampleFocus from './components/ui-shared/Input';
import { Container } from 'semantic-ui-react';
import InputForm from './components/ui-shared/InputForm';

function App() {
  const handleSubmit = (e, value) => {
    e.preventDefault();
    // When the 'Submit' button gets pressed from the username screen,
    // We should send a request to the server to create a new room with
    // the uuid we generate here.
    console.log('Form input value is ', value);
  };

  return (
    <Container>
      <InputForm handleSubmit={handleSubmit} />
    </Container>
  );
}

export default App;
