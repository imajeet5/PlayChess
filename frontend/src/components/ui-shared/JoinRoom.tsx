import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import InputForm from './InputForm';

// this component is used for the user who want to connect to the existing game
export default function JoinRoom({ gameId, isCreator }) {
  const { socket, socketId, username, setUsername } = useContext(SocketContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e, value) => {
    e.preventDefault();

    if (socket.connected) {
      socket.close();
    }
    socket.open();
    setUsername(value);
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    if (socketId && isFormSubmitted) {
      const userGameData = {
        gameId,
        username,
      };
      socket.emit('joinGame', userGameData);

      setIsFormSubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketId, isFormSubmitted]);
  const success = <h1>Hi {username}, Please wait while we connect...</h1>;

  return (
    <div>
      {socketId ? (
        success
      ) : (
        <InputForm username={username} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}
