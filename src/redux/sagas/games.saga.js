import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_GAMES" actions
function* fetchGames() {
  try {
    // fetch all games
    const games = yield axios.get('/api/game')
    console.log(games);
    yield put({ type: 'SET_GAMES', payload: games.data });
  } catch (error) {
    console.log('error with fetchGamesSaga:', error);
  }
}

function* postGames(action) {
  try {
    // add games to DB
    yield axios.post('/api/game', action.payload);
  } catch (error) {
    console.log('error with postGamesSaga:', error);
  }
}

function* gamesSaga() {
  yield takeEvery('FETCH_GAMES', fetchGames);
  yield takeEvery('REGISTER_GAMES', postGames);
}

export default gamesSaga;