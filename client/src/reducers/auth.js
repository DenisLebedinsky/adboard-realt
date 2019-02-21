import { FETCH_AUTH_SUCCESS, CLEAR_TOKEN } from './../actionTypes';

const ssToken = sessionStorage.getItem('token') !== '' ? sessionStorage.getItem('token') : '';

const initialState = {
  token: ssToken,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_AUTH_SUCCESS: {
      return { token: payload.token };
    }
    case CLEAR_TOKEN: {
      return { token: '' };
    }
    default:
      return state;
  }
};
