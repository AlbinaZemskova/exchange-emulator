import { combineReducers } from 'redux';
import buyOrders from './buyOrders';
import sellOrders from './sellOrders';
import history from './history';

const allReducers = combineReducers({
  buyOrders,
  sellOrders,
  history,
});

export default allReducers;
