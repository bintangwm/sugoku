import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [],
  playerBoard: [],
  difficulty: 'random',
  loading: true,
  status: 'unsolved',
  username: ''
}

function reducer(state=initialState, action) {
  let newBoard = []
  switch (action.type) {
    case 'RESET_GAME':
      return {...state, difficulty: 'random', board: [], loading: true, status: 'unsolved', playerBoard: [] };
    case 'SET_DIFFICULTY':
      return {...state, difficulty: action.payload};
    case 'SET_STATUS':
      console.log(action.payload)
      return {...state, status: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'FETCH_BOARD':
      newBoard = action.payload
      return {...state, board: newBoard, playerBoard: newBoard};
    case 'HANDLE_CHANGE':
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