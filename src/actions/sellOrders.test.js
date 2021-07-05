import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  addOrderForSell,
  loadOrdersForSell,
} from './sellOrders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

localStorage.setItem('serverStorage', JSON.stringify(
  {
    buyOrders: [
      {
        price: 1000,
        count: 20,
      },
    ],
    sellOrders: [
      {
        price: 5000,
        count: 100,
      },
    ],
    history: [],
  },
));

describe('action', () => {
  let expectedActions;
  let store;
  let sellOrder;

  beforeEach(() => {
    store = mockStore({});
    sellOrder = {
      price: 500,
      count: 200,
    };
  });

  describe('async actions', () => {
    it('creates ADD_ORDER_FOR_SELL when fetching orders has been done', () => {
      expectedActions = [
        {
          type: 'ADD_ORDER_OF_BUY',
          buyOrders: [],
        },
        {
          type: 'ADD_ORDER_OF_SELL',
          sellOrders: [
            {
              price: 500,
              count: 180,
            },
            {
              price: 5000,
              count: 100,
            },
          ],
        },
        {
          type: 'ADD_HISTORY',
          history: [
            {
              price: 500,
              count: 20,
            },
          ],
        },
      ];

      store.dispatch(addOrderForSell(sellOrder));
      expect(store.getActions()).toEqual(expectedActions);
      expect(JSON.parse(localStorage.getItem('clientStorage'))).toEqual({
        buyOrders: [],
        history: [
          {
            price: 500,
            count: 20,
          },
        ],
        sellOrders: [
          {
            price: 500,
            count: 180,
          },
          {
            price: 5000,
            count: 100,
          },
        ],
      });
    });

    it('load orders of sell from server', () => {
      expectedActions = [
        {
          type: 'LOAD_ORDERS_OF_SELL',
          sellOrders: [
            {
              price: 500,
              count: 180,
            },
            {
              price: 5000,
              count: 100,
            },
          ],
        },
      ];

      store.dispatch(loadOrdersForSell());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
