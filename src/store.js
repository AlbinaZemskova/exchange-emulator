import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

/**
 * Creates a store
 */
const store = createStore(
  allReducers,
  undefined,
  applyMiddleware(thunk),
);

export default store;
