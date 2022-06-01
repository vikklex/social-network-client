import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FriendInfo from './index';

import checkPropTypes from 'check-prop-types';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<FriendInfo user={props} />);

  return component;
};

describe('Friend info render', () => {
  describe('Check PropTypes', () => {
    it('Not throw some warning', () => {
      const expectedProps = {
        user: {
          status: 'Test hi',
          city: 'Test Minsk',
          relations: 'Test Single',
        },
      };

      const propsErr = checkPropTypes(
        FriendInfo.propTypes,
        expectedProps,
        'props',
        FriendInfo.name,
      );

      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have props', () => {
    let wrapper;

    beforeEach(() => {
      const props = {
        user: {
          city: 'Dagobah',
          relations: 'single',
          status: 'Always with you, it cannot be done',
        },
      };

      wrapper = setUp(props.user);
    });

    it('Render without errors', () => {
      expect(wrapper.find(`[data-test='headline__component']`)).toHaveLength(1);
    });

    it('render with status', () => {
      expect(wrapper.find(`[data-test='status']`)).toHaveLength(1);
    });

    it('render with city', () => {
      expect(wrapper.find(`[data-test='city']`)).toHaveLength(1);
    });

    it('render with relations', () => {
      expect(wrapper.find(`[data-test='relations']`)).toHaveLength(1);
    });
  });

  describe('Have NO props', () => {
    const wrapper = shallow(<FriendInfo />);

    it('no render', () => {
      expect(wrapper.find(`[data-test='headline__component']`)).toHaveLength(0);
    });
  });
});
