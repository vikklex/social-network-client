import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

const mockClient = {
  io: jest.fn(() => ({
    on: jest.fn(),
    emit: jest.fn(),
    connected: true,
  })),
};

jest.mock('socket.io-client', () => {
  return mockClient;
});

jest.setTimeout(50000);

window.HTMLElement.prototype.scrollIntoView = function () {};
