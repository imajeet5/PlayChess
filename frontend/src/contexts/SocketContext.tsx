import React, { createContext, useState } from 'react';
import socket from '../connection/socket';

function useConnectSocket() {
  const [socketId, setSocketId] = useState('');

  socket.on('connect', () => {
    console.log('Socket connected id: ', socket.id);
    setSocketId(socket.id);
  });

  return { socket, socketId };
}

export const SocketContext = createContext({ socket, socketId: socket.id });

const SocketContextProvider = (props) => {
  const { socket, socketId } = useConnectSocket();
  return (
    <SocketContext.Provider value={{ socket, socketId }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
