import reducer from './buyOrders';


describe('reducer', () => {
  let mockState;
  beforeEach(() => {
    mockState = {
      buyOrders: [],
    };
  });

  it('should handle ADD_ORDER_OF_BUY', () => {
    const action = {
      type: 'ADD_ORDER_OF_BUY',
      buyOrders: [
        {
          price: 1000,
          count: 200,
        },
        {
          price: 2000,
          count: 150,
        },
      ],
    };

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      buyOrders: action.buyOrders,
    });
  });

  it('should handle LOAD_ORDERS_OF_BUY', () => {
    const action = {
      type: 'LOAD_ORDERS_OF_BUY',
      buyOrders: [
        {
          price: 1000,
          count: 200,
        },
      ],
    };

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      buyOrders: action.buyOrders,
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mockState);
  });
});
