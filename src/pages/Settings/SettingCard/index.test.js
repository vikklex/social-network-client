import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SettingCard from './index';

configure({ adapter: new Adapter() });

const props = {
  title: 'Privacy',
  onChange: () => {},
  checked: false,
};

const wrapper = shallow(
  <SettingCard
    title={props.title}
    onChange={props.onChange}
    checked={props.checked}
  />,
);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Setting', () => {
  it('Setting', () => {
    expect(wrapper.find('.settings__card')).toHaveLength(1);
  });
});
