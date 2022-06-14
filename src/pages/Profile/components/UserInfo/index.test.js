import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserInfo from './index';

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const props = {
  user: {
    id: '1',
    city: 'Minsk',
  },
};
const wrapper = shallow(<UserInfo user={props.user} />);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('User info', () => {
  it('User info', () => {
    expect(wrapper.find('.personal__photos_upload')).toHaveLength(1);
  });
});
