import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AutoCompleteHeader from './index';

configure({ adapter: new Adapter() });

const props = {
  search: 'hi',
  onSearch: jest.fn(),
  onChange: jest.fn(),
  onSelect: jest.fn(),
  searchUsers: ['1', '2', '3'],
  style: {
    width: '80%',
  },
};

const wrapper = shallow(
  <AutoCompleteHeader
    search={props.search}
    onSearch={props.onSearch}
    onChange={props.onChange}
    onSelect={props.onSelect}
    searchUsers={props.searchUsers}
    style={props.style}
  />,
);

describe('AutoComplete render', () => {
  it('Autocomplete', () => {
    expect(wrapper.find(`[data-test='autocomplete']`)).toHaveLength(1);
  });
});
