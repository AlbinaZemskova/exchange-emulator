import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import {
  App,
  mapDispatchToProps,
} from '../App';
import 'jest-prop-type-error';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper;
  let addOrderForBuy;
  let addOrderForSell;
  let loadOrdersForBuy;
  let loadOrdersForSell;
  let loadHistoryOfDeal;

  beforeEach(() => {
    addOrderForBuy = jest.fn();
    addOrderForSell = jest.fn();
    loadOrdersForSell = jest.fn();
    loadHistoryOfDeal = jest.fn();
    loadOrdersForBuy = jest.fn();

    wrapper = shallow(
      <App
        addOrderForBuy={addOrderForBuy}
        addOrderForSell={addOrderForSell}
        loadOrdersForBuy={loadOrdersForBuy}
        loadOrdersForSell={loadOrdersForSell}
        loadHistoryOfDeal={loadHistoryOfDeal}
      />,
    );
  });

  describe('App component', () => {
    describe('render', () => {
      it('renders without crashing, generate orders from config for first launch', () => {
        expect(addOrderForBuy).toHaveBeenCalledTimes(15);
        expect(addOrderForSell).toHaveBeenCalledTimes(15);
        expect(JSON.parse(localStorage.getItem('serverStorage'))).toEqual({
          buyOrders: [],
          sellOrders: [],
          history: [],
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('checking correct proptypes', () => {
        expect(() => (
          <App
            addOrderForBuy={{}}
            addOrderForSell={{}}
            loadOrdersForBuy={{}}
            loadOrdersForSell={{}}
            loadHistoryOfDeal={{}}
          />
        )).toThrow();
      });

      it('load orders', () => {
        expect(JSON.parse(localStorage.getItem('isInitialValuesWasSetted'))).toBe(true);
        expect(loadOrdersForBuy).toHaveBeenCalled();
        expect(loadOrdersForSell).toHaveBeenCalled();
        expect(loadHistoryOfDeal).toHaveBeenCalled();
      });
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    const actions = mapDispatchToProps(dispatch);
    actions.loadOrdersForSell();
    expect(dispatch).toHaveBeenCalled();
  });
});
