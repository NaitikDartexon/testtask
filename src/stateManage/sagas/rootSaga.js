import {fork, spawn} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import LoadProductSaga from './LoadProductSaga';

function* RootSaga() {
  yield spawn(AuthSaga);
  yield spawn(LoadProductSaga);
}

export default RootSaga;
