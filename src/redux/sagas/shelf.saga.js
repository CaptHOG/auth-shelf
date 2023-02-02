import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";


function* getShelf() {
  try {
    const response = yield axios.get('/api/shelf')
    // console.log(response.data);
    yield put({ type: 'SET_SHELF', payload: response.data })
  } catch (error) {
    console.error('Error getShelf in shelf.saga.js:', error);
  }
}

function* shelfSaga() {
  yield takeEvery('FETCH_SHELF', getShelf)
  yield takeEvery('ADD_ITEM', addItem)
}

function* addItem(){
  try {
    const response = yield axios.post('/api/shelf', action.payload);
    console.log( response); 
    yield put ({ type: 'ADD_TO_SHELF', payload: action.payload});
  } catch (error){
    console.log('Error with addItem in ItemTable', error)
  }
}


export default shelfSaga;