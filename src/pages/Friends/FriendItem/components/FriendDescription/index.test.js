import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FriendDescription from './index';

import checkPropTypes from 'check-prop-types';

configure({ adapter: new Adapter() });

const props = {
  user: {
    avatar: '/public/1653916540348-yoda.jpeg',
    city: 'Dagobah',
    desc: 'Yoda was a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years, playing integral roles in the Clone Wars, the instruction of Luke Skywalker, and unlocking the path to immortality.',
    email: 'yoda@mail.ru',
    first_name: 'Yoda',
    from: 'Dagobah',
    gender: 'Male',
    id: '6294bee5296e84c3c5c6b29d',
    job: 'Jedi Master',
    last_name: 'Jedi Master',
    posts_visibility: true,
    relationships: 'Single',
    status: 'Always with you, it cannot be done',
  },
};
const wrapper = shallow(<FriendDescription user={props.user} />);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Friend item render', () => {
  it('Friend item', () => {
    expect(wrapper.find(`[data-test='friend__description']`)).toHaveLength(1);
  });
});
