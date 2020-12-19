import React, { useEffect } from 'react';

export default function UserWaiting({
  username,
  socket,
  setOpponentUserName,
  gameId,
}) {
  useEffect(() => {
    socket.on('oppGameData', (oppName) => {
      console.log('Opponent has joined the game', oppName);
      console.log('We can start the game now');
      // we will sent the current username (gameCreator) to the socket server so that, opponent get the user name
      const creatorData = {
        gameId: gameId,
        username,
      };
      socket.emit('gameCreatorData', creatorData);

      setOpponentUserName(oppName);
    });
    socket.on('error', (data) => {
      console.error('Something went wrong', data);
    });

    return () => {
      socket.off('startGame');
      socket.off('error');
    };
  }, []);
  return (
    <div>
      <h1>Welcome {username}</h1>
      <h3>Your Socket id is {socket.id}</h3>
    </div>
  );
}
