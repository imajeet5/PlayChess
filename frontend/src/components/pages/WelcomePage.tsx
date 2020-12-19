import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import JoinRoom from '../ui-shared/JoinRoom';
import UserWaiting from '../ui-shared/UserWaiting';
import Lobby from '../ui/Lobby';

// Either it a new user waiting to join the existing game or new user (creator) waiting for opponent
export default function WelcomePage() {
  const { socket, socketId, username } = useContext(SocketContext);
  const { gameId } = useParams<{ gameId: string }>();
  // if socketId exist then user is the creator of the game
  const [isCreator, setIsCreator] = useState(socketId ? true : false);
  const [opponentUserName, setOpponentUserName] = useState(null);

  useEffect(() => {
    socket.on('startGame', (data) => {
      console.log('Opponent has joined the game', data);
      console.log('We can start the game now');
    });
    socket.on('error', (data) => {
      console.error('Something went wrong', data);
    });
  }, []);

  const userWaiting = (
    <React.Fragment>
      <UserWaiting
        socket={socket}
        username={username}
        setOpponentUserName={setOpponentUserName}
        gameId={gameId}
      />
    </React.Fragment>
  );
  const userWantToJoin = (
    <React.Fragment>
      <JoinRoom
        gameId={gameId}
        isCreator={false}
        setOpponentUserName={setOpponentUserName}
      />
    </React.Fragment>
  );

  const waitingJSX = isCreator ? userWaiting : userWantToJoin;

  // if we got the opponent User name we will start the game, otherwise we will wait to get the opponent username
  return (
    <div>
      {opponentUserName ? (
        <Lobby
          myUserName={username}
          opponentUserName={opponentUserName}
          isCreator={isCreator}
          socket={socket}
        />
      ) : (
        waitingJSX
      )}
    </div>
  );
}
