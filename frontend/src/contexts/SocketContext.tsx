import React, { createContext, useState } from 'react';
import { Socket } from 'socket.io-client';
import {} from 'socket.io-client';
import socket from '../connection/socket';

interface ContextType {
  socket: typeof Socket;
  socketId: string;
  username: string;
  setUsername: any;
}

function useConnectSocket() {
  const [socketId, setSocketId] = useState('');

  socket.on('connect', () => {
    console.log('Socket connected id: ', socket.id);
    setSocketId(socket.id);
  });

  return { socket, socketId };
}

export const SocketContext = createContext<ContextType>({
  socket,
  socketId: socket.id,
  username: '',
  setUsername: null,
});

const SocketContextProvider = (props) => {
  const { socket, socketId } = useConnectSocket();
  const [username, setUsername] = useState('');
  return (
    <SocketContext.Provider value={{ socket, socketId, username, setUsername }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
