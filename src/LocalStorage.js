class LocalStorage {
  /**
   * Creates a new store
   * @param { stgring } key
   * @param { object } value
   */
  createStore(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets value by the passed key
   * @param { string } key
   */
  readStore(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Updates value by the passed key
   * @param { string } key
   * @param { object } newValue
   */
  updateStore(key, newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
  }
}

export default new LocalStorage();
