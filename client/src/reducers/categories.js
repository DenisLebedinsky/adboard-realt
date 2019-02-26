import * as R from 'ramda';

import { FETCH_CATEGORIES_SUCCESS, ADD_CATEGORY_SUCCESS } from './../actionTypes';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES_SUCCESS:
      const newValues = R.indexBy(R.prop('id'), payload);
      return R.merge(state, newValues);
    case ADD_CATEGORY_SUCCESS:
      const addValue = R.indexBy(R.prop('id'), payload);
      return R.merge(state, addValue);  
    default:
      return state;
  }
};
