import {combineReducers} from 'redux';
import {AuthReducer} from './reducers/AuthReducer';
import {LoadProductReducer} from './reducers/LoadProductReducer';

export const allReducer = combineReducers({
  AuthReducer,
  LoadProductReducer,
});
