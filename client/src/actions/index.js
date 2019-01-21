import {
  FETCH_ITEMS_START,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_CHECK_START,
  FETCH_ITEMS_CHECK_SUCCESS,
  FETCH_ITEMS_CHECK_FAILURE,
  FETCH_ITEMS_SEARCH_START,
  FETCH_ITEMS_SEARCH_SUCCESS,
  FETCH_ITEMS_SEARCH_FAILURE,
  LOAD_MORE_ITEMS_START,
  LOAD_MORE_ITEMS_SUCCESS,
  LOAD_MORE_ITEMS_FAILURE,
  FETCH_ITEMS_BY_ID_START,
  FETCH_ITEMS_BY_ID_SUCCESS,
  FETCH_ITEMS_BY_ID_FAILURE,
  ADD_ITEM_TO_BASKET,
  SEARCH_ITEM,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  UPLOAD_ITEMS_START,
  UPLOAD_ITEMS_SUCCESS,
  UPLOAD_ITEMS_FAILURE,
  FETCH_AUTH_START,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  PATCH_ITEMS_START,
  PATCH_ITEMS_SUCCESS,
  PATCH_ITEMS_FAILURE,
  CLEAR_TOKEN,
  DEL_ITEMS_BY_ID_START,
  DEL_ITEMS_BY_ID_SUCCESS,
  DEL_ITEMS_BY_ID_FAILURE,
  CHECK_ITEMS_START,
  CHECK_ITEMS_FAILURE,
  CHECK_ITEMS_SUCCESS,
} from './../actionTypes';
import { getRenderedItemsLength } from './../selectors';
import {
  fetchItemsApi,
  loadMoreItemsApi,
  fetchItemByIDApi,
  fetchCategoriesApi,
  fetchItemsBySearchApi,
  sendAdToServerApi,
  fetchItemsCheckApi,
  fetchAuthApi,
  patchonServerApi,
  chekingItemApi,
  dellItemApi,
} from './../api';

export const fetchItems = () => async dispatch => {
  dispatch({ type: FETCH_ITEMS_START });

  try {
    const items = await fetchItemsApi();
    dispatch({
      type: FETCH_ITEMS_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const fetchItemsCheck = token => async dispatch => {
  dispatch({ type: FETCH_ITEMS_CHECK_START });
  try {
    const items = await fetchItemsCheckApi(token);
    dispatch({
      type: FETCH_ITEMS_CHECK_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ITEMS_CHECK_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const loadMoreItems = () => async (dispatch, getState) => {
  const categoryId = getState().routing.locationBeforeTransitions.pathname.substring(
    12
  );

  const offset = getRenderedItemsLength(getState(), categoryId);
  dispatch({ type: LOAD_MORE_ITEMS_START });
  try {
    const items = await loadMoreItemsApi({ offset }, categoryId);
    dispatch({
      type: LOAD_MORE_ITEMS_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: LOAD_MORE_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const fetchItemByID = id => async dispatch => {
  dispatch({ type: FETCH_ITEMS_BY_ID_START });
  try {
    const item = await fetchItemByIDApi(id);
    dispatch({
      type: FETCH_ITEMS_BY_ID_SUCCESS,
      payload: item,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ITEMS_BY_ID_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const addItemToBasket = id => dispatch => {
  dispatch({
    type: ADD_ITEM_TO_BASKET,
    payload: id,
  });
};

export const searchItem = text => async dispatch => {
  dispatch({ type: FETCH_ITEMS_SEARCH_START });

  const strSearch = text.toLowerCase();
  try {
    const items = await fetchItemsBySearchApi(strSearch);
    if (items.length >= 1) {
      dispatch({
        type: FETCH_ITEMS_SEARCH_SUCCESS,
        payload: items,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_ITEMS_SEARCH_FAILURE,
      payload: err,
      error: true,
    });
  }

  dispatch({
    type: SEARCH_ITEM,
    payload: text,
  });
};

export const fetchCategories = () => async dispatch => {
  dispatch({ type: FETCH_CATEGORIES_START });
  try {
    const items = await fetchCategoriesApi();
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const sendAdToServer = nitem => async dispatch => {
  dispatch({ type: UPLOAD_ITEMS_START });

  try {
    await sendAdToServerApi(nitem);
    dispatch({ type: UPLOAD_ITEMS_SUCCESS });
  } catch (err) {
    dispatch({
      type: UPLOAD_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const patchonServer = (nitem, token) => async dispatch => {
  dispatch({ type: PATCH_ITEMS_START });

  try {
    await patchonServerApi(nitem, token);
    dispatch({ type: PATCH_ITEMS_SUCCESS });
  } catch (err) {
    dispatch({
      type: PATCH_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const chekingItem = (id, token) => async dispatch => {
  dispatch({ type: CHECK_ITEMS_START });

  try {
    await chekingItemApi(id, token);
    dispatch({ type: CHECK_ITEMS_SUCCESS });
  } catch (err) {
    dispatch({
      type: CHECK_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const fetchAuth = (username, password) => async dispatch => {
  dispatch({ type: FETCH_AUTH_START });

  try {
    const token = await fetchAuthApi(username, password);
    dispatch({
      type: FETCH_AUTH_SUCCESS,
      payload: token,
    });
    sessionStorage.setItem('token', token);
  } catch (err) {
    dispatch({
      type: FETCH_AUTH_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const delItem = (id, token) => async dispatch => {
  dispatch({ type: DEL_ITEMS_BY_ID_START });

  try {
    const res = dellItemApi(id, token);
    dispatch({
      type: DEL_ITEMS_BY_ID_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: DEL_ITEMS_BY_ID_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const signOut = () => dispatch => {
  dispatch({ type: CLEAR_TOKEN });
  sessionStorage.setItem('token', '');
};
