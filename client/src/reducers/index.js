import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import items from './items';
import itemsPage from './itemsPage';
import itemPage from './itemPage';
import categories from './categories';
import auth from './auth';
import checkitems from './checkitems';

export default combineReducers({
  routing: routerReducer,
  items,
  itemsPage,
  itemPage,
  categories,
  auth,
  checkitems,
});
