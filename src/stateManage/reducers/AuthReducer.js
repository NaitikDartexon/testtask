import {
  VERIFY_NUMBER_FAIL,
  VERIFY_NUMBER_REQUEST,
  VERIFY_NUMBER_SUCCESS,
} from '../Actions';

let initialState = {
  loader: false,
  data: null,
  error: '',
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_NUMBER_REQUEST:
      return {...state, loader: true, data: null, error: ''};
    case VERIFY_NUMBER_SUCCESS:
      return {...state, loader: false, data: action?.payload, error: ''};
    case VERIFY_NUMBER_FAIL:
      return {...state, loader: false, data: null, error: action.payload};
    case 'LOGIN_DATA_RESET':
      return {...state, loader: false, data: null, error: ''};
    default:
      return state;
  }
};
