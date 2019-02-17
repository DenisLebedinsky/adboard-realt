import * as at from './../actionTypes';
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
  categoryAddApi, categoryDeleteApi, categoryUpdateApi
} from './../api';

export const fetchItems = () => async dispatch => {
  dispatch({ type: at.FETCH_ITEMS_START });

  try {
    const items = await fetchItemsApi();
    dispatch({
      type: at.FETCH_ITEMS_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: at.FETCH_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const fetchItemsCheck = token => async dispatch => {
  dispatch({ type: at.FETCH_ITEMS_CHECK_START });
  try {
    const items = await fetchItemsCheckApi(token);
    dispatch({
      type: at.FETCH_ITEMS_CHECK_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: at.FETCH_ITEMS_CHECK_FAILURE,
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
  dispatch({ type: at.LOAD_MORE_ITEMS_START });
  try {
    const items = await loadMoreItemsApi({ offset }, categoryId);
    dispatch({
      type: at.LOAD_MORE_ITEMS_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: at.LOAD_MORE_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const fetchItemByID = id => async dispatch => {
  dispatch({ type: at.FETCH_ITEMS_BY_ID_START });
  try {
    const item = await fetchItemByIDApi(id);
    dispatch({
      type: at.FETCH_ITEMS_BY_ID_SUCCESS,
      payload: item,
    });
  } catch (err) {
    dispatch({
      type: at.FETCH_ITEMS_BY_ID_FAILURE,
      payload: err,
      error: true,
    });
  }
};


export const searchItem = text => async dispatch => {
  dispatch({ type: at.FETCH_ITEMS_SEARCH_START });

  const strSearch = text.toLowerCase();
  try {
    const items = await fetchItemsBySearchApi(strSearch);
    if (items.length >= 1) {
      dispatch({
        type: at.FETCH_ITEMS_SEARCH_SUCCESS,
        payload: items,
      });
    }
  } catch (err) {
    dispatch({
      type: at.FETCH_ITEMS_SEARCH_FAILURE,
      payload: err,
      error: true,
    });
  }

  dispatch({
    type: at.SEARCH_ITEM,
    payload: text,
  });
};

export const fetchCategories = () => async dispatch => {
  dispatch({ type: at.FETCH_CATEGORIES_START });
  try {
    const items = await fetchCategoriesApi();
    dispatch({
      type: at.FETCH_CATEGORIES_SUCCESS,
      payload: items,
    });
  } catch (err) {
    dispatch({
      type: at.FETCH_CATEGORIES_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const sendAdToServer = nitem => async dispatch => {
  dispatch({ type: at.UPLOAD_ITEMS_START });
  try {
    await sendAdToServerApi(nitem);
    dispatch({ type: at.UPLOAD_ITEMS_SUCCESS });
  } catch (err) {
    dispatch({
      type: at.UPLOAD_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const patchonServer = (nitem, token) => async dispatch => {
  dispatch({ type: at.PATCH_ITEMS_START });
  try {
    await patchonServerApi(nitem, token);
    dispatch({ type: at.PATCH_ITEMS_SUCCESS });
  } catch (err) {
    dispatch({
      type: at.PATCH_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const chekingItem = (id, token) => async dispatch => {
  dispatch({ type: at.CHECK_ITEMS_START });
  try {
    await chekingItemApi(id, token);
    dispatch({ type: at.CHECK_ITEMS_SUCCESS });
  } catch (err) {
    dispatch({
      type: at.CHECK_ITEMS_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const fetchAuth = (username, password) => async dispatch => {
  dispatch({ type: at.FETCH_AUTH_START });

  try {
    const token = await fetchAuthApi(username, password);
    dispatch({
      type: at.FETCH_AUTH_SUCCESS,
      payload: token,
    });
    sessionStorage.setItem('token', token);
  } catch (err) {
    dispatch({
      type: at.FETCH_AUTH_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const delItem = (id, token) => async dispatch => {
  dispatch({ type: at.DEL_ITEMS_BY_ID_START });

  try {
    const res = dellItemApi(id, token);
    if(res === 200){
    dispatch({
      type: at.DEL_ITEMS_BY_ID_SUCCESS,
      payload: res,
    });
    }else{
      dispatch({
        type: at.DEL_ITEMS_BY_ID_FAILURE,
        payload: res,
        error: true,
      });
    }
  } catch (err) {
    dispatch({
      type: at.DEL_ITEMS_BY_ID_FAILURE,
      payload: err,
      error: true,
    });
  }
};

export const signOut = () => dispatch => {
  dispatch({ type: at.CLEAR_TOKEN });
  sessionStorage.setItem('token', '');
};

export const addCategory = (id, token) => async dispatch => {
  dispatch({ type: at.ADD_CATEGORY_START});

  try {
    const res = categoryAddApi(id, token);
    dispatch({
      type: at.ADD_CATEGORY_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: at.ADD_CATEGORY_FAILURE,
      payload: err,
      error: true,
    });
  }
};


export const deleteCategory = (item, token) => async dispatch => {
  dispatch({ type: at.DEL_ITEMS_BY_ID_START});

  try {
    const res = categoryDeleteApi(item, token);
    dispatch({
      type: at.DEL_ITEMS_BY_ID_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: at.DEL_ITEMS_BY_ID_FAILURE,
      payload: err,
      error: true,
    });
  }
};


export const updateCategory = (item, token) => async dispatch => {
  dispatch({ type: at.UPDATE_CATEGORY_STAT });

  try {
    const res = categoryUpdateApi(item, token);
    dispatch({
      type: at.UPDATE_CATEGORY_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: at.UPDATE_CATEGORY_FAILURE,
      payload: err,
      error: true,
    });
  }
};
