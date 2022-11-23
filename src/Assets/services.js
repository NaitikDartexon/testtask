import axios from 'axios';
import {ApiURL} from './config';

export const postData = payload => {
  return axios
    .post(ApiURL + payload.endPoint, payload.data)
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};

export const getData = payload => {
  return axios
    .get(ApiURL + payload.endPoint)
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};
