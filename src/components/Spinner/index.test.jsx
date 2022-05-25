import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Spinner from './index';

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
      <Spinner>
        <h1>Spinner</h1>
      </Spinner>,
    );

    expect(screen.getByText('Spinner')).toBeInTheDocument();
  });
});
