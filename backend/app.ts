import express from 'express';
import http from 'http';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
const app = express();
const PORT = 8000;

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (client: Socket) => {
  console.log(`Client id: ${client.id} is connected`);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
