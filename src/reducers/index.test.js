import { createStore } from 'redux';
import allReducers from '.';
import buyOrders from './buyOrders';
import sellOrders from './sellOrders';
import history from './history';


describe('combineReducers', () => {
  it('combine all reducers in project', () => {
    const store = createStore(allReducers);

    expect(store.getState().buyOrders).toEqual(buyOrders(undefined, []));
    expect(store.getState().sellOrders).toEqual(sellOrders(undefined, []));
    expect(store.getState().history).toEqual(history(undefined, []));

    const actionBuyOrders = { type: 'ADD_ORDER_OF_BUY', buyOrders: [{ price: 100, count: 2 }, { price: 200, count: 4 }] };
    const actionSellOrders = { type: 'ADD_ORDER_OF_SELL', sellOrders: [{ price: 700, count: 2 }, { price: 800, count: 40 }] };
    const actionHistory = { type: 'ADD_HISTORY' };

    store.dispatch(actionBuyOrders);
    store.dispatch(actionSellOrders);
    store.dispatch(actionHistory);

    expect(store.getState().buyOrders).toEqual(buyOrders(undefined, actionBuyOrders));
    expect(store.getState().sellOrders).toEqual(sellOrders(undefined, actionSellOrders));
    expect(store.getState().history).toEqual(history(undefined, actionHistory));
  });
});
