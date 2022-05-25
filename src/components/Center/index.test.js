import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Center from './index';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Center', () => {
  it('Center', () => {
    render(
      <Center>
        <h1>Center</h1>
      </Center>,
    );

    expect(screen.getByText('Center')).toBeInTheDocument();
  });
});
