import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import InputForm from '../ui-shared/InputForm';
import uuid from 'uuid/dist/v4';

export default function HomePage() {
  const { socket, socketId, username, setUsername } = useContext(SocketContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [username, setUsername] = useState('');
  const history = useHistory();

  // when game is created we will send the user to /game/:gameId route to wait for other user to connect
  useEffect(() => {
    socket.on('gameCreated', (data: { gameId: string; socketId: string }) => {
      history.push(`/game/${data.gameId}`);
    });

    // when the component un-mount we will stop listening to the event
    return () => {
      socket.off('gameCreated');
    };
  }, []);

  // we will connect to the socket when the user submit the form
  const handleSubmit = (e, value) => {
    e.preventDefault();
    if (socket.connected) {
      socket.close();
    }
    socket.open();
    setUsername(value);
    setIsFormSubmitted(true);
  };

  // then when the socket id is available we and the form is submitted
  useEffect(() => {
    if (socketId && isFormSubmitted) {
      const newGameRoomId = uuid();
      socket.emit('createNewGame', newGameRoomId);

      setIsFormSubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketId, isFormSubmitted]);

  return (
    <div>
      <InputForm username={username} handleSubmit={handleSubmit} />
    </div>
  );
}
