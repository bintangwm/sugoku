export function fetchBoard(difficulty) {
  const url = 'https://sugoku.herokuapp.com/board?difficulty=' + difficulty
  console.log(url);
  return (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    fetch(url)
       .then(res => {
         return res.json()
       })
       .then(res => {
         dispatch({
           type: 'FETCH_BOARD',
           payload: res.board
         })
       })
       .catch(console.log)
       .finally(() => {
          console.log('fetch done')
          dispatch({ type: 'SET_LOADING', payload: false })
        })
  }
}

export function changeNumber(payload) {
  return {
    type: 'HANDLE_CHANGE',
    payload
  }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function validateResult(payload) {
  const data = { board: payload}
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        const status = response.status
        dispatch({ type: 'SET_STATUS', payload: status })
      })
      .catch(console.warn)
      .finally(() => {
        // console.log('validate finish');
      })
  }
}

export function setDifficulty(payload) {
  return {
    type: 'SET_DIFFICULTY',
    payload
  }
}

export function setLoading(payload) {
  return {
    type: 'SET_LOADING',
    payload
  }
}

export function solveResult(payload) {
  const data = { board: payload}
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'FETCH_BOARD',
          payload: response.solution
        })
      })
      .catch(console.warn)
  }
}

export function resetGame() {
  return {
    type: 'RESET_GAME'
  }
}