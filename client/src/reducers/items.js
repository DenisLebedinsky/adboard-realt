import * as R from 'ramda';

import {
  FETCH_ITEMS_SUCCESS,
  LOAD_MORE_ITEMS_SUCCESS,
  FETCH_ITEMS_BY_ID_SUCCESS,
  FETCH_ITEMS_SEARCH_SUCCESS,
} from './../actionTypes';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ITEMS_SUCCESS:
      const newValues = R.indexBy(R.prop('id'), payload);
      return R.merge(state, newValues);

    case LOAD_MORE_ITEMS_SUCCESS:
      const moreValues = R.indexBy(R.prop('id'), payload);
      return R.merge(state, moreValues);

    case FETCH_ITEMS_BY_ID_SUCCESS:
      return R.assoc(payload.id, payload, state);

    case FETCH_ITEMS_SEARCH_SUCCESS:
      const searchvalue = R.indexBy(R.prop('id'), payload);
      return R.merge(state, searchvalue);
    default:
      return state;
  }
};
