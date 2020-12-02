import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [],
  playerBoard: [],
  loading: true,
  status: 'notStarted',
  isValidate: false,
  time: 0,
  score: 0,
  scoreBoard: []
}

function reducer(state=initialState, action) {
  let newBoard = []
  let newScoreBoard = []
  let isValidate = state.isValidate
  let time = state.time
  let score = 0
  let payload = {}
  switch (action.type) {
    case 'SET_GAMESTARTED':
      return {...state, isGameStarted: action.payload};
    case 'RESET_TIME':
      return {...state, time: 0};
    case 'SET_TIME':
      time++
      return {...state, time: time++};
    case 'RESET_GAME':
      return {...state, difficulty: 'random', board: [], loading: true, status: 'notStarted', playerBoard: [], time: 0, score: 0 };
    case 'SET_STATUS':
      if (action.currentStatus === state.status) {
        isValidate = !isValidate
      }
      console.log(action.status)
      return {...state, status: action.status, isValidate: isValidate};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'CALCULATE_SCORE':
      score = 100000 - action.time
      if (score < 0) {
        score = 0
      }
      payload = {
        name: action.name,
        score,
        difficulty: action.difficulty
      }
      newScoreBoard = state.scoreBoard.concat(payload)
      newScoreBoard.sort(function(a, b) {
        return b.score - a.score;
      });
      return {...state, score: score, time: 0, scoreBoard: newScoreBoard};
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