import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import StatusInput from './index';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Status', () => {
  it('Status Input', () => {
    const props = {
      user: {
        id: '1',
      },
      onPressEnter: () => {},
      statusText: 'hi',
      setStatusText: () => {},
      inputDisplay: 'block',
    };
    render(
      <StatusInput
        user={props.user}
        onPressEnter={props.onPressEnter}
        statusText={props.statusText}
        setStatusText={props.setStatusText}
        inputDisplay={props.inputDisplay}
      />,
    );

    expect(screen.getByPlaceholderText('Set status...')).toBeInTheDocument();
  });
});
