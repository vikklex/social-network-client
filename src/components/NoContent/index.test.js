import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import NoContent from './index';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('No content', () => {
  it('No content', () => {
    render(
      <NoContent>
        <h1>Oops...</h1>
      </NoContent>,
    );

    expect(screen.getByText('Oops...')).toBeInTheDocument();
  });
});
