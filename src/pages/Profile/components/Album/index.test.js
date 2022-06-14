import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Album from './index';

test('Album renders correctly', async () => {
  render(<Album images={['/1.png', '/2.png', '/3.png']} />);
  expect(screen.getByTestId('/3.png')).toBeInTheDocument();
});
