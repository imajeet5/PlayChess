import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import JoinRoom from '../ui-shared/JoinRoom';

export default function WelcomePage() {
  const { socket, socketId } = useContext(SocketContext);
  const { gameId } = useParams<{ gameId: string }>();
  const [isCreator, setIsCreator] = useState(socketId ? true : false);

  const userWaiting = (
    <React.Fragment>
      <h1>Welcome</h1>
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
