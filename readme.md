## Description

Chess game that can be played between two player in real time.

## Stack

- Fontend is using React and for the chess logic chess.js library is used. React-Konva is used for canvas rendering
- Backend is Node-Socket.io Server
- Typescript both at frontend and backend

## Setup

No extra set up is required, just take clone and do npm install.  
Nodejs Port is set to 8001 by default

# Project Structure

- Routes
  - '/' root path, new user goes to this path and create the game
  - '/game/:gameId' after the game is create new user is redirected to this path which he can share with other person.
  - '/game/:gameId' when other person visit this path, he is asked to enter name and after submitting game begins
- Contexts
  - Only one context is there _SocketContext_ which stores socket and username information
- Components

  - Pages

    - HomePage: Here user is asked to enter his username and after submitting the username, a socket connection gets open. The socket connection then emit a `createNewGame` event with the unique gameId. Our backend server then created a room with the passed gameId and join the current user in that room.  
      Socket will listen for `gameCreated` event and of receiving will redirect to '/game/:uniqueGameId.
    - WelcomePage: This page has two condition for showing content on a) User is creator of the game b) User want to join the game at the gameId he has.  
       a) User is the creator of the game: Then _UserWaiting_ component is rendered in which socket listener is setup to listen for `oppGameData` event. On receiving that event, socket will emit `gameCreatorData` event with the create info to the opponent. When the opponent game data is received, then game starts  
       b) User want to join the existing game: As user directly visiting this path './game/:gameId', so we know he is not the creator of the game and Input form is render. After submitting the input form, socket connection is open and `JoinGame` event is fired with the userData and gameid. A listener is already setup for the `creatorGameData`, so after Joining the game creator will know the opponent is connected and fire `gameCreatorData`. Opponent on receiving that event will start the game

    - Lobby: This will rendered when the game starts and is a wrapper of ChessGame component.
    - ChessGame: Creator of the game is assign color **white** by default and opponent is **black** (based on isCreator).
      Each time usermove a piece `new move` event is first the the move data. On receiving the `new move` event server will broadcasts `opponent move` data which clients are already listening and update the board based on the move
