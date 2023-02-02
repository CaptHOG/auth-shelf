import axios from "axios";
// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { takeEvery, put } from "redux-saga/effects";

function* getShelf() {
  // const dispatch = useDispatch();

  try {
    const response = yield axios.get('/shelf')
    console.log(response.data);
    yield put({ type: 'SET_SHELF', payload: response.data })
  } catch (error) {
    console.error('Error getShelf in shelf.saga.js:', error);
  }
}

function* shelfSaga() {
  yield takeEvery('FETCH_SHELF', getShelf)
}


export default shelfSaga;