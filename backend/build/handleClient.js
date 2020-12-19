"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeGame = void 0;
var chalk_1 = __importDefault(require("chalk"));
var initializeGame = function (io, client) {
    client.on('createNewGame', function (gameId) {
        console.log('Creating game id ', gameId);
        client.join(gameId);
        client.emit('GameCreated', { gameId: gameId, socketId: client.id });
    });
    client.on('joinGame', function (gameId) {
        var room = io.sockets.adapter['rooms'].get(gameId);
        console.log(room);
    });
    client.on('disconnect', function () {
        console.log("Socket id: " + chalk_1.default.bold.red(client.id) + " is disconnected");
    });
};
exports.initializeGame = initializeGame;
//# sourceMappingURL=handleClient.js.map