import { useEffect, useState } from 'react';
import ChessGame from '../chess/ui/chessgame';
import chessMove from '../chess/assets/moveSoundEffect.mp3';
import useSound from 'use-sound';
import { Socket } from 'socket.io-client';
import { useHistory } from 'react-router-dom';

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
  const [isOppConnected, setIsOppConnected] = useState(true);
  const history = useHistory();

  const redirectToHome = () => {
    history.push('/');
  };

  const [play] = useSound(chessMove);
  useEffect(() => {
    socket.on('opponentDisconnected', () => {
      setIsOppConnected(false);
    });

    return () => {
      socket.off('opponentDisconnected');
    };
  }, []);

  const styleMarginBottom = {
    marginBottom: '10px',
  };

  return (
    <div>
      {isOppConnected ? (
        <h1>
          {' '}
          {myUserName} vs {opponentUserName}
        </h1>
      ) : (
        <div>
          <h1>Opponent has left the game</h1>
          <p style={styleMarginBottom}>Do you want to create a new game?</p>
          <button
            style={styleMarginBottom}
            onClick={redirectToHome}
            className="ui positive basic button"
          >
            Yes
          </button>
        </div>
      )}

      <ChessGame
        playAudio={play}
        gameId={gameId}
        isCreator={isCreator}
        socket={socket}
      />
    </div>
  );
}
