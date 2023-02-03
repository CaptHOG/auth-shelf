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

function* addItem(action){
  try {
    const response = yield axios.post('/api/shelf', action.payload);
    console.log( response); 
    yield put ({ type: 'FETCH_SHELF' });
  } catch (error){
    console.log('Error with addItem in ItemTable', error)
  }
}

function* deleteItem(action) {
  try {
    const response = yield axios.delete(`/api/shelf/${action.payload.itemId}`)
    // console.log('action.payload item.id:', action.payload.itemId)
    // console.log('action.payload user_id:', action.payload.user_id)
    // console.log('response:', response)

    const idToSend = {
      userId: action.payload.user_id,
      itemId: action.payload.itemId
    }

    yield put({ type: 'DELETE_ITEM', payload: idToSend })
    // yield put to bring the DOM back in sync
    yield put({ type: 'FETCH_SHELF' })
  } catch (error) {
    console.error('Error deleteItem in shelf.saga:', error)
  }
}

function* shelfSaga() {
  yield takeEvery('FETCH_SHELF', getShelf)
  yield takeEvery('ADD_ITEM', addItem)
  yield takeEvery('SAGA_DELETE_ITEM', deleteItem)
}


export default shelfSaga;