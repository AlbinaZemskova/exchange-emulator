import { Exchange } from '../Exchange';

class MockStorage {
  constructor() {
    this.store = {};
  }

  createStore(key, value) {
    this.store[key] = value;
  }

  readStore(key) {
    return this.store[key] || null;
  }

  updateStore(key, newValue) {
    return this.store[key] = newValue;
  }
}

const mockStore = new MockStorage();

mockStore.createStore('serverStorage', {
  buyOrders: [
    {
      price: 1090, count: 200,
    },
  ],
  sellOrders: [
    {
      price: 2000, count: 100,
    },
  ],
  history: [],
});

const exchange = new Exchange(mockStore);

describe('Exchange', () => {
  let buyOrders;
  let sellOrders;
  let history;

  beforeEach(() => {
    buyOrders = [];
    sellOrders = [];
    history = [];
  });

  describe('calculate orders method', () => {
    it('count of sell order > count of buy order', () => {
      buyOrders.push({ price: 1000, count: 20 }, { price: 1000, count: 10 });
      sellOrders.push({ price: 800, count: 50 });
      exchange.calculateCrossingOrders({ buyOrders, sellOrders, history });

      expect(history).toEqual([{ price: 800, count: 10 }, { price: 800, count: 20 }]);
    });

    it('count of sell order == count of buy order', () => {
      buyOrders.push({ price: 1000, count: 20 }, { price: 1000, count: 30 });
      sellOrders.push({ price: 700, count: 20 }, { price: 800, count: 20 });
      exchange.calculateCrossingOrders({ buyOrders, sellOrders, history });

      expect(history).toEqual([{ price: 700, count: 20 }, { price: 800, count: 20 }]);
      expect(buyOrders).toEqual([{ price: 1000, count: 10 }]);
    });

    it('price of sell order == price of buy order', () => {
      buyOrders.push({ price: 1000, count: 20 });
      sellOrders.push({ price: 1000, count: 20 });
      exchange.calculateCrossingOrders({ buyOrders, sellOrders, history });

      expect(history).toEqual([{ price: 1000, count: 20 }]);
    });

    it('count of sell order < count of buy order', () => {
      buyOrders.push({ price: 1000, count: 60 });
      sellOrders.push({ price: 800, count: 50 });
      exchange.calculateCrossingOrders({ buyOrders, sellOrders, history });

      expect(history).toEqual([{ price: 800, count: 50 }]);
    });

    it('count of sell price < count of buy price', () => {
      buyOrders.push({ price: 800, count: 60 });
      sellOrders.push({ price: 1000, count: 50 });
      exchange.calculateCrossingOrders({ buyOrders, sellOrders, history });

      expect(history).toEqual([]);
    });
  });

  it('handles adding order of buy', () => {
    exchange.handlesAddingOrderOfBuy({ price: 2000, count: 200 });
    expect(mockStore.readStore('serverStorage').buyOrders).toEqual(
      [
        {
          price: 2000, count: 100,
        },
        {
          price: 1090, count: 200,
        },
      ],
    );
    expect(mockStore.readStore('serverStorage').sellOrders).toEqual([]);
    expect(mockStore.readStore('serverStorage').history).toEqual([{ price: 2000, count: 100 }]);
  });

  it('handles adding order of sell', () => {
    exchange.handlesAddingOrderOfSell({ price: 1000, count: 150 });
    expect(mockStore.readStore('serverStorage').buyOrders).toEqual(
      [
        {
          price: 1090, count: 150,
        },
      ],
    );
    expect(mockStore.readStore('serverStorage').sellOrders).toEqual([]);
    expect(mockStore.readStore('serverStorage').history).toEqual(
      [
        {
          price: 2000, count: 100,
        },
        {
          price: 1000, count: 100,
        },
        {
          price: 1000, count: 50,
        },
      ],
    );
  });
});
