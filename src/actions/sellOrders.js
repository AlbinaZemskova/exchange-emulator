import Exchange from '../Exchange';

/**
 * Add getting sell for buy
 * @param {object} sellOrder
 */
export const addOrderForSell = (sellOrder) => dispatch => {
  let calculatedOrders = Exchange.handlesAddingOrderOfSell(sellOrder);
  let {
    buyOrders,
    sellOrders,
    history,
  } = calculatedOrders;
   
  localStorage.setItem('clientStorage', JSON.stringify(calculatedOrders));

  dispatch({
    type: 'ADD_ORDER_OF_BUY',
    buyOrders,
  });
  
  dispatch({
    type: 'ADD_ORDER_OF_SELL',
    sellOrders,
  });

  dispatch({
    type: 'ADD_HISTORY',
    history,
  });
};

/**
 * Load orders of sell from server
 */
export const loadOrdersForSell = () => dispatch => {
  let sellOrders = Exchange.getOrdersOfSell();

  dispatch({
    type: 'LOAD_ORDERS_OF_SELL',
    sellOrders,
  });
};
