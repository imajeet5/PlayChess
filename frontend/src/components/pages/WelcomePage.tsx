import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import JoinRoom from '../ui-shared/JoinRoom';

// Either it a new user waiting to join the existing game or new user (creator) waiting for opponent
export default function WelcomePage() {
  const { socket, socketId, username } = useContext(SocketContext);
  const { gameId } = useParams<{ gameId: string }>();
  // if socketId exist then user is the creator of the game
  const [isCreator, setIsCreator] = useState(socketId ? true : false);

  useEffect(() => {
    socket.on('startGame', (data) => {
      console.log('We can start the game', data);
    });
  }, []);

  const userWaiting = (
    <React.Fragment>
      <h1>Welcome {username}</h1>
      <h3>Your Socket id is {socketId}</h3>
    </React.Fragment>
  );
  const userWantToJoin = (
    <React.Fragment>
      <JoinRoom gameId={gameId} isCreator={false} />
    </React.Fragment>
  );

  return <div>{isCreator ? userWaiting : userWantToJoin}</div>;
}
