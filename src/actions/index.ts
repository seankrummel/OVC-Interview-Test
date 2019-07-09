import {User, Store, ResponseError} from '../types';
import {ThunkAction} from "redux-thunk";

export type Action = {
  type: 'FETCH_DATA_REQUEST'
} | {
  type: 'FETCH_DATA_SUCCESS',
  data: Array<User>
} | {
  type: 'FETCH_DATA_ERROR'
  err: ResponseError
}

const fetchDataRequest = (): Action => ({
  type: 'FETCH_DATA_REQUEST'
});
const fetchDataSuccess = (data: Array<User>): Action => ({
  type: 'FETCH_DATA_SUCCESS',
  data
});
const fetchDataError = (err: ResponseError): Action => ({
  type: 'FETCH_DATA_ERROR',
  err
});
export const fetchData = (): ThunkAction<void, Store, null, Action> => dispatch => {
  dispatch(fetchDataRequest());
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res: Response) => normalizeResponseErrors(res))
    .then(res => dispatch(fetchDataSuccess(res)))
    .catch(err => dispatch(fetchDataError({code: err.code, message: err.message})))
}

const normalizeResponseErrors = (res: Response) => {
  if (!res.ok) {
    if (
      res.headers.has('content-type') &&
      res.headers.get('content-type').startsWith('application/json')
    ) return res.json().then(err => Promise.reject(err));
    return Promise.reject({
      code: res.status,
      message: res.statusText
    })
  }
  return res.json();
}
