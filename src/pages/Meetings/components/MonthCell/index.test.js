import '@testing-library/jest-dom';

import moment from 'moment';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MonthCell from './index';
import getMonthData from 'utils/getListData';

configure({ adapter: new Adapter() });

const date = moment();

const props = {
  value: date,
  meetings: [
    {
      createdAt: date.toISOString(),
      date: date.toISOString(),
      description: '123',
      endTime: date.toISOString(),
      id: '6297135cb27ded9341b613be',
      importance: 'success',
      participants: [
        '6294ba0b296e84c3c5c6ae24',
        '6294bee5296e84c3c5c6b29d',
        '629665b64f75ff85ab903835',
      ],
      startTime: date.toISOString(),
      title: '123',
      updatedAt: date.toISOString(),
      userId: '629665b64f75ff85ab903835',
    },
  ],
  onSelect: () => {},
};

const listData = getMonthData(props.value, props.meetings);

const wrapper = shallow(
  <MonthCell
    value={props.value}
    meetings={props.meetings}
    onSelect={props.onSelect}
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

describe('Month cell', () => {
  it('Month cell', () => {
    expect(wrapper.find('.events')).toHaveLength(1);
  });
});
