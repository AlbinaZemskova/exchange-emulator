import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { loadHistoryOfDeal } from './history';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

localStorage.setItem('serverStorage', JSON.stringify(
  {
    buyOrders: [],
    sellOrders: [],
    history: [{
      price: 1000,
      count: 20,
    }],
  },
));

describe('action', () => {
  let expectedActions;
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  describe('async actions', () => {
    it('load history of deal from server', () => {
      expectedActions = [
        {
          type: 'LOAD_HISTORY_OF_DEAL',
          history: [
            {
              price: 1000,
              count: 20,
            },
          ],
        },
      ];

      store.dispatch(loadHistoryOfDeal());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
