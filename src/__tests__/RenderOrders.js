import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import {
  RenderOrders,
  mapStateToProps,
} from '../RenderOrders';
import 'jest-prop-type-error';

Enzyme.configure({ adapter: new Adapter() });

describe('<RenderOrder />', () => {
  let wrapper;
  let buyOrders;
  let sellOrders;

  beforeEach(() => {
    buyOrders = [
      {
        price: 1000,
        count: 100,
      },
      {
        price: 1000,
        count: 200,
      },
      {
        price: 2000,
        count: 1,
      },
    ];

    sellOrders = [
      {
        price: 5000,
        count: 300,
      },
      {
        price: 5000,
        count: 250,
      },
      {
        price: 17000,
        count: 300,
      },
    ];

    wrapper = shallow(
      <RenderOrders
        buyOrders={buyOrders}
        sellOrders={sellOrders}
      />,
    );
  });

  describe('RenderOrders component', () => {
    describe('render', () => {
      it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('checking correct proptypes', () => {
        expect(() => (
          <RenderOrders
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
  });

  describe('mapStateToProps', () => {
    it('should return an object with the arrays of objects', () => {
      const mockState = {
        buyOrders: {
          buyOrders,
        },
        sellOrders: {
          sellOrders,
        },
      };

      const expected = {
        buyOrders,
        sellOrders,
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
});
