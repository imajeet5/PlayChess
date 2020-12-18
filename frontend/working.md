# Frontend Working

## On Path '/'

- As the app starts, user is connected to the socket client
- When user submits the form on the home screen then a _newGameId_ is generated
- An event is fired from the client **createNewGame** with the _newGameId_
- User is redirected to the path `/game/newGameId`

## On Path '/'

- First it is checked if user is a) creator of the game or b) user just want to join the existing game.
- a) if user is creator of the game
  - Client will emit **playerJoinGame** with data `{gameID, userName, isCreator}`
  - The the Chess game component is rendered with listener for events **playerJoinedRoom**, **status** , **start game**, **give userName**, **get Opponent UserName**.
  -

# Backend Working

- **createNewGame**: this will receive the unique _newGameId_ and will create a room with the id. Then will emit the event **createNewGame** with data `{gameId, mySocketId}`.
- **playerJoinGame**: 
