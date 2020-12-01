export function fetchBoard(difficulty) {
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
       .then(res => {
         return res.json()
       })
       .then(res => {
        //  console.log(res.board);
         dispatch({
           type: 'FETCH_BOARD',
           payload: res.board
         })
       })
       .catch(console.log)
       .finally(() => console.log('fetch done'))
  }
}

export function changeNumber(payload) {
  // console.log(payload);
  return {
    type: 'HANDLE_CHANGE',
    payload
  }
}

export function validateResult(payload) {
  return console.log(payload, 'val');
  // return {
  //   type: 'HANDLE_CHANGE',
  //   payload
  // }
}