import * as R from 'ramda';

export const getToken = state => state.auth.token;

export const getItemById = (state, id) => R.prop(id, state.items);

export const getActiveCategoryId = ownProps =>
  R.path(['params', 'id'], ownProps);

export const getItems = (state, ownProps) => {
  const activeCategoryId = getActiveCategoryId(ownProps);

  const applySearch = item =>
    R.contains(
      state.itemsPage.search.toLowerCase(),
      R.prop('name', item).toLowerCase()
    );

  const appyCategory = item =>
    R.equals(getActiveCategoryId(ownProps), R.prop('categoryId', item));

  return R.compose(
    R.filter(applySearch),
    R.when(R.always(activeCategoryId), R.filter(appyCategory)),
    R.map(id => getItemById(state, id))
  )(state.itemsPage.ids);
};

export const getRenderedItemsLength = (state, activeCategoryId) => {
  const applySearch = item =>
    R.contains(
      state.itemsPage.search.toLowerCase(),
      R.prop('name', item).toLowerCase()
    );

  const appyCategory = item =>
    R.equals(activeCategoryId, R.prop('categoryId', item));

  const items = R.compose(
    R.filter(applySearch),
    R.when(R.always(activeCategoryId), R.filter(appyCategory)),
    R.map(id => getItemById(state, id))
  )(state.itemsPage.ids);

  return R.length(items);
};

export const getCategories = state => R.values(state.categories);

export const getcheckItems = state => {
  const items = [];
  for (let key in state.checkitems.checkitems) {
    items.push(state.checkitems.checkitems[key]);
  }
  return items;
};
