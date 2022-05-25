import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import EditorBtn from './index';

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

describe('Editor button', () => {
  it('Editor button', () => {
    const props = {
      onSubmit: () => {},
      comment: false,
    };
    render(
      <EditorBtn onSubmit={props.onSubmit} comment={props.comment}>
        Share
      </EditorBtn>,
    );

    expect(screen.getByText('Share')).toBeInTheDocument();
  });
});
