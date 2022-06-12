import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Message from './index';

configure({ adapter: new Adapter() });

const props = {
  own: true,
  message: {
    id: '629d96542f9ac814ad2fa6a9',
    sender: '6294b7b8296e84c3c5c6ac93',
    text: 'There are',
  },
};
const wrapper = shallow(<Message own={props.own} message={props.message} />);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Message render', () => {
  it('Message render', () => {
    expect(wrapper.find(`[data-test='message']`)).toHaveLength(1);
  });
});
