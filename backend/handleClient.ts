import { Server, Socket } from 'socket.io';
export const initializeGame = (io: Server, client: Socket) => {
  //   client.on('CreateGame', (id) => {
  //     console.log('Creating game id ', id);
  //     client.emit('GameCreated', { gameId: id, mySocketId: client.id });
  //   });

  setInterval(() => {
    client.emit(
      'local',
      `This is message is broadcast locally by client id ${client.id} `
    );
  }, 2000);
};
