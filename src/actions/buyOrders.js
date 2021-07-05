import Exchange from '../Exchange';

/**
 * Add getting order for buy
 * @param {object} buyOrder
 */
export const addOrderForBuy = (buyOrder) => dispatch => {
  let calculatedOrders = Exchange.handlesAddingOrderOfBuy(buyOrder);
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
 * Load orders of buy from server
 */
export const loadOrdersForBuy = () => dispatch => {
  let buyOrders = Exchange.getOrdersOfBuy();

  dispatch({
    type: 'LOAD_ORDERS_OF_BUY',
    buyOrders,
  });
};
