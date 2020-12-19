import React, { useEffect } from 'react';

export default function Lobby({ myUserName, opponentUserName, isCreator, socket }) {
  useEffect(() => {
    
  }, [])
  return (
    <div>
      <h1>Opponent has joined the game</h1>
      <p>
        We will begin {myUserName} vs {opponentUserName} shortly
      </p>
    </div>
  );
}
