import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import InputForm from './InputForm';

// this component is used for the user who want to connect to the existing game
export default function JoinRoom({ gameId, isCreator, setOpponentUserName }) {
  const { socket, socketId, username, setUsername } = useContext(SocketContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = (e, value) => {
    e.preventDefault();

    if (socket.connected) {
      socket.close();
    }
    socket.open();
    setUsername(value);
    setIsFormSubmitted(true);
  };

  // when we receive the opponent game data we will start the game
  useEffect(() => {
    socket.on('creatorGameData', (oppName) => {
      setOpponentUserName(oppName);
    });
    socket.on('error', (message) => {
      setError(message);
    });
    return () => {
      socket.off('creatorGameData');
      socket.off('error');
    };
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
        history.push('/');
      }, 1500);
    }
  }, [error]);

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

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

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
