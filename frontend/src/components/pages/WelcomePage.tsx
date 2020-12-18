import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';

export default function WelcomePage() {
  const { socket, socketId } = useContext(SocketContext);
  const { gameId } = useParams<{ gameId: string }>();
  console.log(gameId);

  const userWaiting = (
    <React.Fragment>
      <h1>Welcome</h1>
      <h3>Your Socket id is {socketId}</h3>
    </React.Fragment>
  );
  const userWantToJoin = (
    <React.Fragment>
      <h1>Welcome</h1>
      <h3>Trying to connect to {gameId}</h3>
    </React.Fragment>
  );

  return <div>{socketId ? userWaiting : userWantToJoin}</div>;
}
