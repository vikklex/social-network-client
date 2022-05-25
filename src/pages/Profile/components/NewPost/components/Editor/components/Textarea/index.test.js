import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import TextAreaEditor from './index';

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

describe('TextArea', () => {
  it('TextArea', () => {
    const props = {
      user: {
        id: 1,
        first_name: 'Ronald',
      },
    };
    render(<TextAreaEditor user={props.user}>What's new</TextAreaEditor>);

    expect(
      screen.getByPlaceholderText("What's new, Ronald?"),
    ).toBeInTheDocument();
  });
});
