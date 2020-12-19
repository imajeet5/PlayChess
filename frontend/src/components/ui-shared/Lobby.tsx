import React, { useEffect } from 'react';
import ChessGame from '../chess/ui/chessgame';
import chessMove from '../chess/assets/moveSoundEffect.mp3';
import useSound from 'use-sound';
import { Socket } from 'socket.io-client';

interface PropsType {
  myUserName: string;
  opponentUserName: string | null;
  isCreator: boolean;
  socket: typeof Socket;
  gameId: string;
}

export default function Lobby({
  myUserName,
  opponentUserName,
  isCreator,
  socket,
  gameId,
}: PropsType) {
  // const play = () => {
  //   console.log('Play audio ');
  // };
  const [play] = useSound(chessMove);
  return (
    <div>
      <h1>Opponent has joined the game</h1>
      <p>
        {myUserName} vs {opponentUserName}
      </p>

      <ChessGame
        playAudio={play}
        gameId={gameId}
        isCreator={isCreator}
        socket={socket}
      />
    </div>
  );
}
