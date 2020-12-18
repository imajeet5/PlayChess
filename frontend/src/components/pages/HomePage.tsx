import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import InputForm from '../ui-shared/InputForm';

export default function HomePage() {
  const { socket, socketId } = useContext(SocketContext);
  const isFormSubmitted = useRef(false);
  const history = useHistory();
  const handleSubmit = (e, value) => {
    e.preventDefault();
    console.log('Form input value is ', value);
    if (socket.connected) {
      socket.close();
    }
    socket.open();
    isFormSubmitted.current = true;

    socket.emit('CreateGame', value);
  };

  useEffect(() => {
    if (socketId && isFormSubmitted.current) {
      history.push(`/game/${socketId}`);
      isFormSubmitted.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketId]);

  return (
    <div>
      <InputForm handleSubmit={handleSubmit} />
    </div>
  );
}
