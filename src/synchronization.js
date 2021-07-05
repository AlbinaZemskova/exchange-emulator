import store from './store';

/**
 * Provides synchronization in several tabs
 */
window.addEventListener('storage', synchronizedValue => {
  switch(synchronizedValue.key){
    case 'clientStorage': {
      let {
        buyOrders,
        sellOrders,
        history,
      } = JSON.parse(synchronizedValue.newValue);

      store.dispatch({
        type: 'ADD_ORDER_OF_BUY',
        buyOrders,
      });

      store.dispatch({
       type: 'ADD_ORDER_OF_SELL',
       sellOrders,
      });

      store.dispatch({
       type: 'ADD_HISTORY',
       history,
      });
    }
  }
});
