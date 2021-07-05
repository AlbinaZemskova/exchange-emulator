import store from '../LocalStorage';


describe('Local Storage', () => {
  let key;
  let value;

  beforeEach(() => {
    key = 'someKey';
    value = {
      someValue: [],
    };
  });

  it('store is created', () => {
    store.createStore(key, value);

    expect(localStorage.key(0)).toEqual(key);
  });

  it('read value from store', () => {
    expect(store.readStore(key)).toEqual(value);
  });

  it('update value from store', () => {
    value = {
      someValue: [1],
    };
    store.updateStore(key, value);

    expect(JSON.parse(localStorage.getItem(key))).toEqual(value);
  });
});
