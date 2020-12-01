import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ],
  playerBoard: []
}

function reducer(state=initialState, action) {
  let newBoard = []
  switch (action.type) {
    case 'FETCH_BOARD':
      newBoard = action.payload
      return {...state, board: newBoard, playerBoard: newBoard};
    case 'HANDLE_CHANGE':
      // for (let i = 0; i < 9; i++) {
      //   for (let j = 0; j < 9; j++) {
      //     if (i === +action.payload.i && j === +action.payload.j) {
      //       newBoard.push(action.payload.value)
      //     } else {
      //       newBoard.push(state.playerBoard[i][j])
      //     }
      //   }
      // }
      let value = +action.payload.value 
      if (isNaN(value) || !value || value > 9 || value < 1) {
        value = 0
      }
      newBoard = state.playerBoard.map((row, i) => {
        return row.map((item, j) => {
          if (i === +action.payload.i && j === +action.payload.j) {
            return value
          }
          return item
        })
      })
      console.log(newBoard);
      // return state
      return {...state, playerBoard: newBoard};
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store