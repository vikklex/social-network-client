import '@testing-library/jest-dom';

import { shallow, configure } from 'enzyme';
import { mockState } from 'mockstate';

import Adapter from 'enzyme-adapter-react-16';

import ModalForm from './index';
import store from 'redux/store/store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(
    <Provider store={store}>
      <ModalForm
        onFinish={props.onFinish}
        initialValue={props.initialValue}
        isMainComponent={props.isMainComponent}
      />
    </Provider>,
  );

  return component;
};

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Modal form render', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      onFinish: jest.fn(),
      initialValue: {},
      isMainComponent: false,
    };

    wrapper = setUp(props);
  });

  jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
      ...ActualReactRedux,
      useSelector: jest.fn().mockImplementation(() => {
        return mockState;
      }),
    };
  });

  it('Modal form', () => {
    expect(wrapper.find("[data-test='modal']")).toHaveLength(0);
  });
});
