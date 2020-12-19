"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var chalk_1 = __importDefault(require("chalk"));
var handleClient_1 = require("./handleClient");
var socket_io_1 = require("socket.io");
var app = express_1.default();
var PORT = 8001;
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.get('/', function (req, res) { return res.send('Express + TypeScript Server'); });
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: 'all',
    },
});
io.on('connection', function (socket) {
    console.log("Socket id: " + chalk_1.default.bold.blue(socket.id) + " is connected");
    handleClient_1.initializeGame(io, socket);
});
setInterval(function () {
    io.emit('global', 'This is message is broadcast globally');
}, 2000);
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });
server.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:" + PORT);
});
//# sourceMappingURL=app.js.map