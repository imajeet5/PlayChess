import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function InputForm({ handleSubmit }) {
  const [state, setState] = useState('');

  //   const { userName } = useContext(ColorContext);

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

/**
 *  <Input
          style={{
            marginLeft: String(window.innerWidth / 2 - 120) + 'px',
            width: '240px',
            marginTop: '62px',
          }}
          value={state}
          onChange={(e) => setState(e.target.value)}
          focus
          placeholder="Search..."
        />
 */
