import { UsergroupAddOutlined } from '@ant-design/icons';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';

import MenuItem from './MenuItem';

ConfigProvider.config({
  prefixCls: 'ant',
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Menu item', () => {
  it('Menu item', () => {
    const props = {
      link: './friends',
      icon: <UsergroupAddOutlined />,
      text: 'My friends',
    };
    render(<MenuItem {...props} key='1'></MenuItem>);

    expect(screen.getByText('My friends')).toBeInTheDocument();
  });
});
