import {put, takeLatest} from 'redux-saga/effects';
import {
  VERIFY_NUMBER_FAIL,
  VERIFY_NUMBER_REQUEST,
  VERIFY_NUMBER_SUCCESS,
  VERIFY_OTP_REQUEST,
} from '../Actions';
import auth from '@react-native-firebase/auth';

let user = null;

async function* verifyNumber(action) {
  try {
    user = await auth().signInWithPhoneNumber('+91' + action.payload);
    if (user._verificationId) {
      yield put({type: VERIFY_NUMBER_SUCCESS, payload: user});
    } else {
      yield put({type: VERIFY_NUMBER_FAIL, payload: 'Invalid Number.'});
    }
  } catch (e) {
    yield put({type: VERIFY_NUMBER_FAIL, payload: 'Wrong Number Input.'});
  }
}

async function* verifyOtp(action) {
  try {
    try {
      const valid = await user.confirm(code);
      alert(valid);
    } catch (error) {
      alert('Invalid code');
    }
  } catch (e) {}
}

function* AuthSaga() {
  yield takeLatest(VERIFY_NUMBER_REQUEST, verifyNumber);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtp);
}

export default AuthSaga;
