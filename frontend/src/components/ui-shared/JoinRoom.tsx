import React, { useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import InputForm from './InputForm';

export default function JoinRoom({ gameId, isCreator }) {
  const { socket, socketId } = useContext(SocketContext);
  const isFormSubmitted = useRef(false);
  const handleSubmit = (e, value) => {
    e.preventDefault();
    console.log('Form input value is ', value);
    if (socket.connected) {
      socket.close();
    }
    socket.open();
    isFormSubmitted.current = true;
  };

  useEffect(() => {
    if (socketId && isFormSubmitted.current) {
      socket.emit('joinGame', gameId);

      isFormSubmitted.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketId]);
  const success = <h1>Connecting...</h1>;

  return (
    <div>{socketId ? success : <InputForm handleSubmit={handleSubmit} />}</div>
  );
}
