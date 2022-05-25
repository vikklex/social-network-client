import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserNumbers from './index';

configure({ adapter: new Adapter() });

const props = {
  user: {
    id: '1',
    city: 'Minsk',
  },
  posts: {
    id: '1',
  },
};
const wrapper = shallow(<UserNumbers user={props.user} posts={props.posts} />);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('User numbers', () => {
  it('User numbers', () => {
    expect(wrapper.find('.personal__numbers_number')).toHaveLength(3);
  });
});
