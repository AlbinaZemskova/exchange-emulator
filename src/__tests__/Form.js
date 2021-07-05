import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Form from '../Form';
import 'jest-prop-type-error';

Enzyme.configure({ adapter: new Adapter() });

describe('<Form />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Form handleSubmit={jest.fn()} />,
    );
  });

  describe('render', () => {
    it('renders without crashing', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('checking proptypes', () => {
      expect(() => (
        <Form handleSubmit={{}} />
      )).toThrow();
    });

    describe('method', () => {
      it('changed price filed', () => {
        const event = {
          target: {
            value: '1000',
            id: 'price',
          },
        };

        expect(wrapper.state().price).toBe('');
        wrapper.instance().onFieldChange(event);
        expect(wrapper.state()[event.target.id]).toEqual(+event.target.value);
      });

      it('changed count filed', () => {
        const event = {
          target: {
            value: '100',
            id: 'count',
          },
        };

        expect(wrapper.state().count).toBe('');
        wrapper.instance().onFieldChange(event);
        expect(wrapper.state()[event.target.id]).toEqual(+event.target.value);
      });
    });
  });
});
