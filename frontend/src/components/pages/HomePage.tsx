import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import InputForm from '../ui-shared/InputForm';

export default function HomePage() {
  const { socket, socketId } = useContext(SocketContext);
  const history = useHistory();
  const handleSubmit = (e, value) => {
    e.preventDefault();
    // When the 'Submit' button gets pressed from the username screen,
    // We should send a request to the server to create a new room with
    // the uuid we generate here.
    console.log('Form input value is ', value);
    socket.open();
    console.log(socketId);
    socket.emit('CreateGame', value);

    // setSocketId(socket.id);
  };

  useEffect(() => {
    if (socketId) {
      history.push(`/game/${socketId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketId]);

  return (
    <div>
      <InputForm handleSubmit={handleSubmit} />
    </div>
  );
}
