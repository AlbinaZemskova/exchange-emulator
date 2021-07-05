import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import {
  HistoryOfDeals,
  mapStateToProps,
} from '../HistoryOfDeals';
import 'jest-prop-type-error';

Enzyme.configure({ adapter: new Adapter() });

describe('<HistoryOfDeal />', () => {
  let wrapper;
  let history;

  beforeEach(() => {
    history = [
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
      <HistoryOfDeals history={history} />,
    );
  });

  describe('HistoryOfDeal component', () => {
    describe('render', () => {
      it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('checking correct proptypes', () => {
        expect(() => (
          <HistoryOfDeals history={
            [
              {
                price: '1',
                count: '2',
              },
            ]
           }
          />
        )).toThrow();
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with the arrays of objects', () => {
      const mockState = {
        history: {
          history,
        },
      };

      const expected = {
        history,
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
});
