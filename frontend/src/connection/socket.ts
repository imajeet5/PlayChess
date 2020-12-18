import { EventEmitter } from 'events';
import io from 'socket.io-client';

const URL = 'http://localhost:8000/';

const socket = io(URL, { upgrade: true });

socket.on('connect', (e: EventEmitter) => {
  console.log(socket.id);
  console.log('Event => ', e);
});
