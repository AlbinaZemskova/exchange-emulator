import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import ListOfOrders from '../ListOfOrders';
import { config } from '../config';
import 'jest-prop-type-error';

Enzyme.configure({ adapter: new Adapter() });

describe('<ListOfOrders />', () => {
  let wrapper;

  describe('render', () => {
    it('render orders for buy', () => {
      wrapper = shallow(
        <ListOfOrders listOfOrders={config.buyOrders} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('render orders for sell', () => {
      wrapper = shallow(
        <ListOfOrders listOfOrders={config.sellOrders} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('checking correct proptypes', () => {
      expect(() => (
        <ListOfOrders listOfOrders={{}} />
      )).toThrow();
    });
  });
});
