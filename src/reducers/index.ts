import {Action} from '../actions';
import {Store} from '../types';

const initialState: Store = {loading: false, err: {code: 0, message: ''}, users: []};

export function reducer(state: Store = initialState, action: Action): Store {
  switch(action.type) {
    case 'FETCH_DATA_REQUEST':
      return {...state, err: {code: 0, message: ''}, loading: true};
    case 'FETCH_DATA_SUCCESS':
      return {...state, loading: false, users: action.data};
    case 'FETCH_DATA_ERROR':
      return {...state, loading: false, err: action.err};
  }
  return state;
}
