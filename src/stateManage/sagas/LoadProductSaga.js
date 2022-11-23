import {call, put, takeLatest} from 'redux-saga/effects';
import {getData, postData} from '../../Assets/services';
import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAIL,
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
} from '../Actions';

function* loadProduct(action) {
  try {
    const products = yield call(getData, action.payload);
    if (products.status === 200) {
      yield put({type: LOAD_PRODUCT_SUCCESS, payload: products.data});
    } else {
      yield put({type: LOAD_PRODUCT_FAIL, payload: 'No product data found.'});
    }
  } catch (e) {
    yield put({type: LOAD_PRODUCT_FAIL, payload: 'Something went wrong'});
  }
}

function* addProduct(action) {
  try {
    const products = yield call(postData, action.payload);

    if (products.status === 200) {
      yield put({type: ADD_PRODUCT_SUCCESS, payload: products.data});
    } else {
      yield put({type: ADD_PRODUCT_FAIL, payload: 'Something went wrong'});
    }
  } catch (e) {
    yield put({type: ADD_PRODUCT_FAIL, payload: 'Something went wrong'});
  }
}

function* LoadProductSaga() {
  yield takeLatest(LOAD_PRODUCT_REQUEST, loadProduct);
  yield takeLatest(ADD_PRODUCT_REQUEST, addProduct);
}

export default LoadProductSaga;
