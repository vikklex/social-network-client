import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import EditBtn from './index';

configure({ adapter: new Adapter() });

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  navigation: jest.fn((options, callback) => callback('Edit', 1)),
}));

describe('Click edit btn', () => {
  it('Click edit btn', () => {
    const mockCallBack = jest.fn();

    const wrapper = shallow(
      <EditBtn onClick={mockCallBack}>Edit profile</EditBtn>,
    );

    expect(wrapper).toHaveLength(1);

    wrapper.find('Button').simulate('click');

    //expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
