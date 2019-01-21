import * as R from 'ramda'

import {FETCH_ITEMS_CHECK_SUCCESS} from './../actionTypes'

const initialState = {
    checkitems: []
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
      case FETCH_ITEMS_CHECK_SUCCESS:
        const newValues = R.indexBy(R.prop('id'), payload);
        return R.merge(state, { checkitems: newValues });
      default:
        return state;
    }
}
