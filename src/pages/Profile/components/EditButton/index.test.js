import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import EditButton from './index';

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

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  navigation: jest.fn((options, callback) => callback('Edit', 1)),
}));

describe('Edit button', () => {
  it('Edit button', () => {
    render(
      <EditButton>
        <h1>Edit profile</h1>
      </EditButton>,
    );

    expect(screen.getByText('Edit profile')).toBeInTheDocument();
  });
});
