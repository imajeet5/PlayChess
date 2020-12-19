import chalk from 'chalk';
import { Server, Socket } from 'socket.io';
export const initializeGame = (io: Server, client: Socket) => {
  client.on('createNewGame', (gameId) => {
    console.log('Creating game id ', gameId);
    client.join(gameId);
    client.emit('gameCreated', { gameId: gameId, socketId: client.id });
  });

  client.on('joinGame', (gameId) => {
    const room = io.sockets.adapter['rooms'].get(gameId);
    if (!room) {
      client.emit('error', 'This game session does not exits.');
      return;
    }
    if (room.size >= 2) {
      client.emit('error', 'There are already two players in this game');
      return;
    }
  });

  client.on('disconnect', () => {
    console.log(`Socket id: ${chalk.bold.red(client.id)} is disconnected`);
  });
};
