const initialState = {
  sellOrders: [],
};

function sellOrders(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ORDER_OF_SELL':
    case 'LOAD_ORDERS_OF_SELL':
      return {
        ...state,
        sellOrders: action.sellOrders,
      };
    default:
      return state;
  }
}

export default sellOrders;
