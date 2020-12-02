import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [],
  playerBoard: [],
  loading: true,
  status: 'notStarted',
  isValidate: false,
  time: 0
}

function reducer(state=initialState, action) {
  let newBoard = []
  let isValidate = state.isValidate
  switch (action.type) {
    case 'SET_TIME':
      return {...state, time: state.time++};
    case 'RESET_GAME':
      return {...state, difficulty: 'random', board: [], loading: true, status: 'notStarted', playerBoard: [] };
    case 'SET_STATUS':
      if (action.currentStatus === state.status) {
        isValidate = !isValidate
      }
      console.log(action.status)
      return {...state, status: action.status, isValidate: isValidate};
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