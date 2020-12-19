import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { Reducer, useImmerReducer } from 'use-immer';
import Game from '../model/chess';

interface initialStateType {
  gameState: Game;
  draggedPieceTargetId: string;
  whiteTurn: boolean;
  whiteKingInCheck: boolean;
  blackKingInCheck: boolean;
}

// const initialState: initialStateType = {
//   gameState: null,
//   draggedPieceTargetId: '', // empty string means no piece is being dragged
//   playerTurnToMoveIsWhite: true,
//   whiteKingInCheck: false,
//   blackKingInCheck: false,
// };

interface propsType {
  isCreator: boolean;
  socket: typeof Socket;
}

interface ActionType {
  type: ACTIONS;
  payload?: any;
}

enum ACTIONS {
  changeTurn = 'changeTurn',
}

const gameReducer: Reducer<initialStateType, ActionType> = (draft, action) => {
  switch (action.type) {
    case ACTIONS.changeTurn:
      draft.whiteTurn = !draft.whiteTurn;
      return;
    

    default:
      break;
  }
};

export default function ChessGame2({ isCreator, socket }: propsType) {
  const [state, dispatch] = useImmerReducer<initialStateType, ActionType>(
    gameReducer,
    {
      gameState: new Game(isCreator),
      draggedPieceTargetId: '', // empty string means no piece is being dragged
      whiteTurn: true,
      whiteKingInCheck: false,
      blackKingInCheck: false,
    }
  );

  useEffect(() => {
    socket.on('opponentMove', (move) => {
      console.log(move);
      dispatch({ type: ACTIONS.changeTurn });
    });
  }, []);

  return <div></div>;
}
