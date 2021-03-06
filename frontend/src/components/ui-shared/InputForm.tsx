import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function InputForm({ handleSubmit, username }) {
  const [state, setState] = useState(username);
  const inputRef = useRef<any>();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e, state)}>
        <Form.Field>
          <label
            style={{
              textAlign: 'center',
              marginTop: '30%',
              fontSize: '30px',
              marginBottom: '1.4rem',
            }}
          >
            Enter Name
          </label>
          <input
            ref={inputRef}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Name..."
          />
        </Form.Field>
        <Button
          type="submit"
          style={{ marginLeft: '50%' }}
          disabled={!(state.length > 0)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
