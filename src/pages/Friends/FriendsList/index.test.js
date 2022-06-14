import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FriendsList from './index';

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate(),
}));

const props = {
  persons: [
    '6294b7b8296e84c3c5c6ac93',
    '6294ba0b296e84c3c5c6ae24',
    '6294bee5296e84c3c5c6b29d',
    '6295ce41d9791b2441b40813',
  ],
};
const wrapper = shallow(<FriendsList persons={props.persons} />);

describe('Friend list render', () => {
  it('Friend List', () => {
    expect(wrapper.find('.friends__list')).toHaveLength(1);
  });
});
