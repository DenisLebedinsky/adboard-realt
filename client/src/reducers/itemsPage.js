import * as R from 'ramda';

import {
  FETCH_ITEMS_SUCCESS,
  LOAD_MORE_ITEMS_SUCCESS,
  SEARCH_ITEM,
  FETCH_ITEMS_SEARCH_SUCCESS,
} from './../actionTypes';

const initialState = {
  ids: [],
  search: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ITEMS_SUCCESS:
      return R.merge(state, {
        ids: R.pluck('id', payload),
      });
    case LOAD_MORE_ITEMS_SUCCESS:
      const ids = R.pluck('id', payload);
      return R.merge(state, {
        ids: R.concat(state.ids, ids),
      });
    case SEARCH_ITEM:
      return R.merge(state, { search: payload });

    case FETCH_ITEMS_SEARCH_SUCCESS:
      return R.merge(state, {
        ids: R.pluck('id', payload),
      });
    default:
      return state;
  }
};
