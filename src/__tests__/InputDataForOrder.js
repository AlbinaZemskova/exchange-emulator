import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import {
  InputDataForOrder,
  mapStateToProps,
  mapDispatchToProps,
} from '../InputDataForOrder';
import 'jest-prop-type-error';

Enzyme.configure({ adapter: new Adapter() });

describe('<InputDataForOrder />', () => {
  let wrapper;
  let addOrderForBuy;
  let addOrderForSell;
  let buyOrders;
  let price;
  let count;
  let event;

  beforeEach(() => {
    event = {
      target: {
        reset: jest.fn(),
      },
      preventDefault: jest.fn(),
    };

    addOrderForSell = jest.fn();
    addOrderForBuy = jest.fn();

    buyOrders = [
      {
        price: 1000,
        count: 200,
      },
      {
        price: 2000,
        count: 150,
      },
    ];

    wrapper = shallow(
      <InputDataForOrder
        addOrderForBuy={addOrderForBuy}
        addOrderForSell={addOrderForSell}
      />,
    );
  });

  describe('InputDataForOrder component', () => {
    describe('render', () => {
      it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('checking correct proptypes', () => {
        expect(() => (
          <InputDataForOrder
            buyOrders={[
              {
                price: '1',
                count: '2',
              },
            ]}
            sellOrders={[
              {
                price: '1',
                count: '2',
              },
            ]}
          />
        )).toThrow();
      });
    });

    describe('methods', () => {
      it('handles getting order for buy', () => {
        price = 1000;
        count = 100;

        wrapper.instance().handleOrderOfBuy(price, count, event);
        expect(addOrderForBuy).toHaveBeenCalledWith({ price, count });
      });

      it('handles getting order for sell', () => {
        price = 2000;
        count = 150;

        wrapper.instance().handleOrderOfSell(price, count, event);
        expect(addOrderForSell).toHaveBeenCalledWith({ price, count });
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with the arrays of objects', () => {
      const mockState = {
        buyOrders: {
          buyOrders,
        },
      };

      const expected = {
        buyOrders,
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    const actions = mapDispatchToProps(dispatch);
    actions.addOrderForBuy();
    expect(dispatch).toHaveBeenCalled();
  });
});
