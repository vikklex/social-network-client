import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MeetingForm from './index';

configure({ adapter: new Adapter() });

const props = {};

const wrapper = shallow(
  <MeetingForm
    handleDelete={props.handleDelete}
    handleEdit={props.handleEdit}
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

describe('Meeting form', () => {
  it('Meeting form', () => {
    expect(wrapper.find('.meeting__form')).toHaveLength(1);
  });
});
