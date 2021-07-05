import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  addOrderForBuy,
  loadOrdersForBuy,
} from './buyOrders';

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
  let buyOrder;

  beforeEach(() => {
    store = mockStore({});
    buyOrder = {
      price: 5700,
      count: 200,
    };
  });

  describe('async actions', () => {
    it('creates ADD_ORDER_FOR_BUY when fetching orders has been done', () => {
      expectedActions = [
        {
          type: 'ADD_ORDER_OF_BUY',
          buyOrders: [
            {
              price: 5700,
              count: 100,
            },
            {
              price: 1000,
              count: 20,
            },
          ],
        },
        {
          type: 'ADD_ORDER_OF_SELL',
          sellOrders: [],
        },
        {
          type: 'ADD_HISTORY',
          history: [
            {
              price: 5000,
              count: 100,
            },
          ],
        },
      ];

      store.dispatch(addOrderForBuy(buyOrder));
      expect(store.getActions()).toEqual(expectedActions);
      expect(JSON.parse(localStorage.getItem('clientStorage'))).toEqual({
        buyOrders: [
          {
            price: 5700,
            count: 100,
          },
          {
            price: 1000,
            count: 20,
          },
        ],
        history: [
          {
            price: 5000,
            count: 100,
          },
        ],
        sellOrders: [],
      });
    });

    it('load orders of buy from server', () => {
      expectedActions = [
        {
          type: 'LOAD_ORDERS_OF_BUY',
          buyOrders: [
            {
              price: 5700,
              count: 100,
            },
            {
              price: 1000,
              count: 20,
            },
          ],
        },
      ];

      store.dispatch(loadOrdersForBuy());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
