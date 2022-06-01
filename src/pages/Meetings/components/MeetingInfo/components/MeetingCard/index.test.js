import '@testing-library/jest-dom';

import moment from 'moment';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MeetingInfo from './index';

configure({ adapter: new Adapter() });

const date = moment();

const props = {
  createdAt: date.toISOString(),
  date: date.toISOString(),
  description: 'We will talk about magic im muggles life',
  endTime: '2022-06-01T04:00:00.783Z',
  id: '62971b4fb27ded9341b61461',
  importance: 'warning',
  participants: [
    {
      avatar: '/public/1653913528647-harry.jpeg',
      first_name: 'Harry',
      id: '6294b7b8296e84c3c5c6ac93',
      last_name: 'Potter',
    },
    {
      avatar: '/public/1653914123657-image.jpeg',
      first_name: 'Ronald',
      id: '6294ba0b296e84c3c5c6ae24',
      last_name: 'Weasley',
    },
  ],

  startTime: date.toISOString(),
  title: 'First group meeting',
  updatedAt: date.toISOString(),
  userId: '1',
};

const wrapper = shallow(<MeetingInfo content={props} />);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Meeting info', () => {
  it('Meeting info', () => {
    expect(wrapper.find('.meeting__info')).toHaveLength(1);
  });
});
