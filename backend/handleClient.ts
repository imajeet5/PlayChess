import chalk from 'chalk';
import { Server, Socket } from 'socket.io';
export const initializeGame = (io: Server, client: Socket) => {
  client.on('createNewGame', (gameId) => {
    console.log('Creating game id ', gameId);
    client.join(gameId);
    client.emit('GameCreated', { gameId: gameId, socketId: client.id });
  });

  client.on('disconnect', () => {
    console.log(`Socket id: ${chalk.bold.red(client.id)} is disconnected`);
  });

  client.on('createNewGame', () => {});
};
