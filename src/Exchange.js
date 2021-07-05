import LocalStorage from './LocalStorage';

class Exchange {
  constructor(store) {
    this.store = store;
  }

  /**
   * Calculates crossing orders
   */
  calculateCrossingOrders({ buyOrders, sellOrders, history }) {
    buyOrders.sort((firstOrder, secondOrder) => {
      return firstOrder.price - secondOrder.price;
    }).reverse();

    sellOrders.sort((firstOrder, secondOrder) => {
      return firstOrder.price - secondOrder.price;
    });

    for (let i = 0; i < sellOrders.length; i++) {
      const sellOrder = sellOrders[i];
      for (let j = 0; j < buyOrders.length; j++) {
        const buyOrder = buyOrders[j];
        if (sellOrder.price <= buyOrder.price) {
          if (sellOrder.count > buyOrder.count) {
            sellOrders[i].count -= buyOrder.count;
            buyOrders.splice(j, 1);
            history.push({ price: sellOrder.price, count: buyOrder.count });
          } else if (sellOrder.count < buyOrder.count) {
            buyOrders[j].count -= sellOrder.count;
            sellOrders.splice(i, 1);
            history.push({ price: sellOrder.price, count: sellOrder.count });
          } else {
            buyOrders.splice(j, 1);
            sellOrders.splice(i, 1);
            history.push({ price: sellOrder.price, count: sellOrder.count });
          }

          return this.calculateCrossingOrders({ buyOrders, sellOrders, history });
        }
      }
    }

    return { buyOrders, sellOrders, history };
  }

  /**
   * Handles adding new order of buy
   * on server and returns calculated data
   */
  handlesAddingOrderOfBuy(buyOrder) {
    const {
      buyOrders,
      sellOrders,
      history,
    } = this.store.readStore('serverStorage');

    const calculatedOrders = this.calculateCrossingOrders({
      buyOrders: [...buyOrders, buyOrder],
      sellOrders,
      history,
    });

    this.store.updateStore('serverStorage', calculatedOrders);
    return calculatedOrders;
  }

  /**
   * Handles adding new order of sell
   * on server and returns calculated data
   */
  handlesAddingOrderOfSell(sellOrder) {
    const {
      buyOrders,
      sellOrders,
      history,
    } = this.store.readStore('serverStorage');

    const calculatedOrders = this.calculateCrossingOrders({
      buyOrders,
      sellOrders: [...sellOrders, sellOrder],
      history,
    });

    this.store.updateStore('serverStorage', calculatedOrders);
    return calculatedOrders;
  }

  /**
   * Getting orders of buy from server
   */
  getOrdersOfBuy() {
    const { buyOrders } = this.store.readStore('serverStorage');

    return buyOrders;
  }

  /**
   * Getting orders of sell from server
   */
  getOrdersOfSell() {
    const { sellOrders } = this.store.readStore('serverStorage');

    return sellOrders;
  }

  /**
   * Getting history of deal from server
   */
  getHistory() {
    const { history } = this.store.readStore('serverStorage');

    return history;
  }
}

export { Exchange };
export default new Exchange(LocalStorage);
