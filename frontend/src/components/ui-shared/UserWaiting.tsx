import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { Divider, Message } from 'semantic-ui-react';

export default function UserWaiting({
  username,
  socket,
  setOpponentUserName,
  gameId,
}) {
  const domainName = 'http://localhost:3001';
  const inputRef = useRef<any>();
  const copyText = () => {
    inputRef.current.select();
    document.execCommand('copy');
  };

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
    <div
      style={{
        textAlign: 'center',
        marginTop: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Welcome {username}</h1>
      <div className="ui action input">
        <input
          ref={inputRef}
          readOnly={true}
          type="text"
          value={domainName + '/game/' + gameId}
          style={{ width: '500px' }}
        />
        <button
          className="ui teal icon right labeled button"
          onClick={copyText}
        >
          <i aria-hidden="true" className="copy icon"></i>Copy
        </button>
      </div>
      <Divider horizontal></Divider>
      <div
        className="ui large message"
        style={{ background: 'none', width: '400px' }}
      >
        Share the above link with your friend to play
      </div>
    </div>
  );
}

/**
 *   <div className="ui action input">
        <input type="text" value="http://ww.short.url/c0opq" />
        <button className="ui teal icon right labeled button">
          <i aria-hidden="true" className="copy icon"></i>Copy
        </button>
      </div>
 */

/**
  * <textarea
        readOnly={true}
        onFocus={(event) => {
          console.log('sd');
          event.target.select();
        }}
        ref={textAreaRef}
        value={domainName + '/game/' + gameId}
      ></textarea>{' '}
      
            <button className="btn" style={{ marginTop: -21 }} onClick={copyText}>
        Copy
      </button>
  */
