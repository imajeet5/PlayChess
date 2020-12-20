import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

const ClientToRoom = new Map<string, string>();

export const initializeGame = (io: Server, client: Socket) => {
  client.on('createNewGame', (gameId) => {
    console.log('Creating game id ', gameId);
    client.join(gameId);
    ClientToRoom.set(client.id, gameId);
    client.emit('gameCreated', { gameId: gameId, socketId: client.id });
  });

  client.on('joinGame', (oppGameData: { gameId: string; username: string }) => {
    const room = io.sockets.adapter['rooms'].get(oppGameData.gameId);
    if (!room) {
      client.emit('error', 'This game session does not exits.');
      return;
    }
    if (room.size >= 2) {
      client.emit('error', 'There are already two players in this game');
      return;
    }

    client.join(oppGameData.gameId);
    ClientToRoom.set(client.id, oppGameData.gameId);

    if (room.size === 2) {
      io.sockets
        .in(oppGameData.gameId)
        .emit('oppGameData', oppGameData.username);
    } else {
      io.sockets.in(oppGameData.gameId).emit('error', 'Something went wrong');
    }
  });

  client.on(
    'gameCreatorData',
    (creatorData: { gameId: string; username: string }) => {
      io.sockets
        .in(creatorData.gameId)
        .emit('creatorGameData', creatorData.username);
    }
  );

  client.on('new move', (move) => {
    const gameId = move.gameId;

    io.to(gameId).emit('opponent move', move);
  });

  client.on('disconnect', () => {
    console.log(`Socket id: ${chalk.bold.red(client.id)} is disconnected`);
    const gameId = ClientToRoom.get(client.id);
    if (gameId) {
      io.to(gameId).emit('opponentDisconnected', 'opponentDisconnected');
    }
  });
  // this is just temporary for debugging purpose, will improve this more later
  // client.on('connect', () => {
  //   const gameId = ClientToRoom.get(client.id);
  //   if (gameId) {
  //     client.join(gameId);
  //   }
  // });
};
