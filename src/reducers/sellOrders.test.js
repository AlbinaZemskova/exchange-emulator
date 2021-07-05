import reducer from './sellOrders';


describe('reducer', () => {
  let mockState;
  beforeEach(() => {
    mockState = {
      sellOrders: [],
    };
  });

  it('should handle ADD_ORDER_FOR_SELL(LOAD_ORDERS_OF_SELL)', () => {
    const action = {
      type: 'ADD_ORDER_OF_SELL',
      sellOrders: [
        {
          price: 1000,
          count: 150,
        },
        {
          price: 2000,
          count: 200,
        },
      ],
    };

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      sellOrders: action.sellOrders,
    });
  });

  it('should handle LOAD_ORDERS_OF_SELL', () => {
    const action = {
      type: 'LOAD_ORDERS_OF_SELL',
      sellOrders: [
        {
          price: 1000,
          count: 200,
        },
      ],
    };

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      sellOrders: action.sellOrders,
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mockState);
  });
});
