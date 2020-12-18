import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import { initializeGame } from './handleClient';

import { Server, Socket } from 'socket.io';
const app = express();
const PORT = 8001;

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: 'all',
  },
});

io.on('connection', (socket: Socket) => {
  console.log(`Socket id: ${chalk.bold.blue(socket.id)} is connected`);
  initializeGame(io, socket);
});
setInterval(() => {
  io.emit('global', 'This is message is broadcast globally');
}, 2000);

// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
