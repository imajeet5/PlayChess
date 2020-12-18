import React, { useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';

export default function WelcomePage() {
  const { socket, socketId } = useContext(SocketContext);
  return (
    <div>
      <h1>Welcome</h1>
      <h3>Your Socket id is {socketId}</h3>
    </div>
  );
}
