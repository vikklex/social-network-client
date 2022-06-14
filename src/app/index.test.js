import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import moment from 'moment';

import secureRandom from 'secure-random';
import MockAdapter from 'axios-mock-adapter';

import userEvent from '@testing-library/user-event';

import store from 'redux/store/store';
import App from './index';
import ClientAPI from 'services/ClientAPI';
import { DATE_FULL_FORMAT } from 'utils/Constants';

let nJwt = require('njwt');

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return {
    ...render(ui, { wrapper: Router }),
  };
};

describe('Entry test', () => {
  const admin = {
    id: '628b38de3390fc74c006d113',
    is_admin: true,
    first_name: 'Bill',
    last_name: 'Gates',
    album: ['1'],
    followers: [],
    followings: [],
    reactions: [],
  };

  const user = {
    id: '628b38de3390fc74c006d114',
    is_admin: false,
    album: [],
    followers: [],
    followings: ['628b38de3390fc74c006d113'],
    reactions: [],
  };

  test('Render app component', async () => {
    const createToken = (id, email) => {
      const key = secureRandom(256, { type: 'Buffer' });

      const claims = {
        iss: 'http://localhost/',
        sub: email,
        id: id,
        scope: 'self',
      };
      return nJwt.create(claims, key).compact();
    };

    const submitLoginForm = async (email, password) => {
      fireEvent.change(screen.getByLabelText('Email'), {
        target: {
          value: email,
        },
      });

      fireEvent.change(screen.getByLabelText('Password'), {
        target: {
          value: password,
        },
      });

      fireEvent.click(await screen.findByText(/Submit/i));
    };

    const mock = new MockAdapter(ClientAPI.instance);

    mock.onPost('/v1/auth/login').reply((config) => {
      const form = JSON.parse(config.data);

      if (form.password_hash !== '12345678') {
        return [403, { msg: 'Forbidden' }];
      }

      const id = form.email === 'test@example.com' ? admin.id : user.id;

      const token = createToken(id, form.email);
      return [
        200,
        {
          msg: {
            access_token: token,
          },
        },
      ];
    });

    mock.onGet(/\/v1\/users\/[0-9a-zA-Z]+/).reply((config) => {
      const user_id = config.url.split('/').slice(-1)[0];
      if (user_id === admin.id) {
        return [
          200,
          {
            user: admin,
          },
        ];
      } else {
        return [
          200,
          {
            user: user,
          },
        ];
      }
    });

    mock.onPut(/\/v1\/users\/[0-9a-zA-Z]+/).reply((config) => {
      return [200, {}];
    });

    mock.onPost('/v1/users/date-statistics/').reply(200, [admin, user]);

    mock.onGet(/\/v1\/reactions\/likedUser\/[0-9a-zA-Z]+/).reply((config) => {
      return [200, []];
    });

    mock.onPost('/v1/conversation/').reply((config) => {
      const form = JSON.parse(config.data);
      return [
        200,
        {
          id: 1,
          participants: [form.senderId, form.receiverId],
          createdAt: new Date().getTime() * 1000,
          updatedAt: new Date().getTime() * 1000,
        },
      ];
    });

    mock.onGet(/\/v1\/conversation\/[0-9a-zA-Z]+/).reply((config) => {
      return [
        200,
        [
          {
            id: 1,
            participants: [
              '628b38de3390fc74c006d113',
              '628b38de3390fc74c006d114',
            ],
            createdAt: new Date().getTime() * 1000,
            updatedAt: new Date().getTime() * 1000,
          },
        ],
      ];
    });

    mock.onGet(/\/v1\/meetings\/[0-9a-zA-Z]+/).reply((config) => {
      return [200, []];
    });

    mock.onGet(/\/v1\/messages\/[0-9a-zA-Z]+/).reply((config) => {
      return [200, []];
    });

    mock.onGet(/\/v1\/reactions\/[0-9a-zA-Z]+/).reply((config) => {
      return [200, []];
    });

    mock.onGet(/\/v1\/comments\/timeline\/[0-9a-zA-Z]+/).reply((config) => {
      return [200, []];
    });

    let postcount = 0;

    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: '/' },
    );

    fireEvent.click(screen.getByText(/Create account/i));

    expect(await screen.findByLabelText(/Surname/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Submit/i));

    expect(
      await screen.findByText(/Surname should be at least 3 characters/i),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Already have/i));
    await submitLoginForm('test@example.com', '12345678');
    fireEvent.click(screen.getByText(/Submit/i));
    // logged in

    expect(await screen.findByText(/My page/i)).toBeInTheDocument();

    expect(screen.getByText(/Edit profile/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Edit profile/i));
    fireEvent.click(screen.getByText('My page'));
    const post_area = await screen.findByPlaceholderText(/What's new/i);

    expect(post_area).toBeInTheDocument();
    userEvent.type(post_area, 'Hello, world!');

    expect(await screen.findByText(/Hello, world!/i)).toBeInTheDocument();

    expect(screen.queryByTestId('feed_wrapper')).toBeNull();

    expect(
      screen.getByRole('button', { name: 'share_button' }),
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'share_button' }));
    expect(await screen.findByTestId('feed_wrapper')).toBeInTheDocument();
    fireEvent.click(screen.getByText('My friends'));

    expect(await screen.findByText(/You don't have/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Posts of my friends'));
    fireEvent.click(screen.getByText('Meetings'));
    fireEvent.click(screen.getByText('Statistics'));
    fireEvent.click(screen.getByText('Reactions'));
    fireEvent.click(screen.getByText('Pro statistics'));
    fireEvent.click(screen.getByText('Settings'));

    expect(screen.getAllByText('Security')[0]).toBeInTheDocument();

    expect(await screen.findByText('Delete profile')).toBeInTheDocument();
    fireEvent.click(screen.getByText('My page'));
    fireEvent.click(await screen.findByText(/Add info:/));

    expect(await screen.findByText('Change Info')).toBeInTheDocument();
    fireEvent.click(screen.getByText('My page'));
    fireEvent.click(await screen.findByTestId('logout_button'));

    // logged out
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    await submitLoginForm('test@example.com', '123456789');

    // non-correct password
    expect(await screen.findByText(/Error: Forbidden/i)).toBeInTheDocument();
    await submitLoginForm('user@example.com', '12345678');

    //  logged in
    expect(await screen.findByText(/My page/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText('My friends'));

    expect(await screen.findByText(/Bill/)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('click_friend'));

    const send_message_button = await screen.findByText(/Send message/i);
    expect(send_message_button).toBeInTheDocument();
    const delete_button = await screen.findByText(/Delete from friends/i);

    expect(delete_button).toBeInTheDocument();
    userEvent.click(send_message_button);

    const message_area = await screen.findByTestId('message_textarea');

    expect(await screen.findByTestId('message_textarea')).toBeInTheDocument();
    userEvent.type(message_area, 'Hello, Bill!');
    const send_button = await screen.findByText(/Sent/i);

    expect(send_button).toBeInTheDocument();
    userEvent.click(send_button);

    fireEvent.click(screen.getByText('Posts of my friends'));
    expect(await screen.findByText('Reply to')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('img', { name: 'like' }));
    fireEvent.click(screen.getByText('Meetings'));

    const today = moment().format(DATE_FULL_FORMAT);
    const today_card = await screen.findByTestId(today);
    expect(today_card).toBeInTheDocument();
    fireEvent.click(today_card);
    expect(await screen.findByText(/Show meetings/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Reactions'));
    fireEvent.click(screen.getByText('Settings'));
    fireEvent.click(screen.getByText('Save changes'));
    expect(await screen.findByText(/Successfully update/i)).toBeInTheDocument();
    mock.restore();
  });
});
