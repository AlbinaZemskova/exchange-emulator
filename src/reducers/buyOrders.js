const initialState = {
  buyOrders: [],
};

function buyOrders(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ORDER_OF_BUY':
    case 'LOAD_ORDERS_OF_BUY':
      return {
        ...state,
        buyOrders: action.buyOrders,
      };
    default:
      return state;
  }
}

export default buyOrders;
