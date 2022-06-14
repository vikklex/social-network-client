import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NewMessage from './index';

configure({ adapter: new Adapter() });

const props = {
  avatar: '',
  onChange: jest.fn(),
  messageText: 'hi',
};

const wrapper = shallow(
  <NewMessage
    avatar={props.avatar}
    onChange={props.onChange}
    messageText={props.messageText}
  />,
);

describe('New message render', () => {
  it('New message render', () => {
    expect(wrapper.find(`[data-test='new-message']`)).toHaveLength(1);
  });
});
