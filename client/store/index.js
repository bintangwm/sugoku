import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ]
}

function reducer(state=initialState, action) {
  let newBoard = []
  switch (action.type) {
    case 'FETCH_BOARD':
      newBoard = action.payload
      return {...state, board: newBoard};
    case 'HANDLE_CHANGE':
      // console.log(action.payload)
      // newBoard = state.board.map(itemI => {
      //   return itemI.map(item => {
      //     if (condition) {
            
      //     }
      //   })
      // })
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (i === +action.payload.i && j === +action.payload.j) {
            newBoard.push(action.payload.value)
          } else {
            newBoard.push(state.board[i][j])
          }
        }
      }
      console.log(newBoard);
      // return state
      return {...state, board: newBoard};
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

// const store = createStore(reducer)

export default store