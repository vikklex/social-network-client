import axios from 'axios';

import moment from 'moment';

import ClientAPI from './ClientAPI';

import LocalStorageMock from '../tests/LocalStorageMock';

function FormDataMock() {
  this.append = jest.fn();
}

global.localStorage = new LocalStorageMock();
global.FormData = FormDataMock;

const OUTPUT_MOCK = {
  'id': '628b38de3390fc74c006d113',
};

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
          eject: jest.fn(),
        },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

describe('Client API', () => {
  it('Login', async () => {
    const data = {
      email: 'bill.gates@microsoft.com',
      password_hash: '12345678',
    };

    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.login(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Register', async () => {
    const data = {
      first_name: 'User',
      last_name: 'Noname',
      email: 'bill.gates@microsoft.com',
      password_hash: '12345678',
    };

    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.register(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Logout', async () => {
    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.logout();

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Search user', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.searchUser(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get user', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.get.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getUser(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get user posts', async () => {
    const data = {
      postId: '1',
    };

    ClientAPI.instance.get.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getUserPosts(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get friends posts', async () => {
    const data = {
      postId: '1',
    };

    ClientAPI.instance.get.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getFriendsPosts(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Update user', async () => {
    const data = {
      userId: '1',
      first_name: 'User',
      last_name: 'Nonamme',
      email: 'user@mail.ru',
      password_hash: '4848070',
      job: 'wizard',
      birthday: '',
      desc: '',
      gender: 'Male',
      relationships: 'single',
      city: 'Minsk',
      from: 'Minsk',
      status: '',
      posts_visibility: true,
      friends_visibility: true,
      album_visibility: true,
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.updateUser(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Add friend', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.addFriend(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Delete friend', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.deleteFriend(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Update avatar', async () => {
    const data = {
      userId: '1',
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.updateAvatar(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Update album', async () => {
    const data = {
      userId: '1',
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.updateAlbum(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Delete avatar', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.delete.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.deleteAvatar(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Delete image', async () => {
    const data = {
      path: '/public/1653312680136-harry.jpeg',
    };

    ClientAPI.instance.delete.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.deleteImageFromAlbum(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Create post', async () => {
    const data = {
      userId: '1',
      desc: 'desc',
    };

    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.createPost(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Update post', async () => {
    const data = {
      userId: '1',
      desc: 'desc',
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.updatePost(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Update post image', async () => {
    const data = {
      postId: '1',
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.updatePostImage(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Delete post', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.delete.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.deletePost(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Create comment', async () => {
    const data = {
      userId: '1',
      postAuthor: '2',
      postId: '3',
      desc: 'desc',
    };

    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.createComment(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get comments', async () => {
    const data = {
      postId: '1',
    };

    ClientAPI.instance.get.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getComments(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Update comment', async () => {
    const data = {
      postId: '1',
      userId: '2',
      desc: 'desc',
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.updateComment(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Delete comment', async () => {
    const data = {
      postId: '1',
      userId: '2',
    };

    ClientAPI.instance.delete.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.deleteComment(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Create reaction', async () => {
    const data = {
      reactionType: 'like',
      contentType: 'post',
      userId: '1',
      likedUser: '2',
      postId: '3',
    };

    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.createReaction(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get post reactions', async () => {
    const data = {
      postId: '3',
    };

    ClientAPI.instance.get.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getAllPostReactions(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get user reactions', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.get.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getAllReactionsForUser(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get reactions from date', async () => {
    const date = moment().toISOString();

    const data = {
      id: '1',
      startDate: date,
      endDate: date,
    };

    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getReactionsFromDate(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Create meeting', async () => {
    const date = moment().toISOString();

    const data = {
      userId: '1',
      participants: ['1', '2'],
      title: 'title',
      description: 'desc',
      importance: 'high',
      date: date,
      startTime: date,
      endTime: date,
    };

    ClientAPI.instance.post.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.createMeeting(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Get meetings', async () => {
    const data = {
      userId: '1',
    };

    ClientAPI.instance.get.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.getMeetings(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Update meeting', async () => {
    const date = moment().toISOString();

    const data = {
      userId: '1',
      participants: ['1', '2'],
      title: 'title',
      description: 'desc',
      importance: 'high',
      date: date,
      startTime: date,
      endTime: date,
    };

    ClientAPI.instance.put.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.updateMeeting(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });

  it('Delete meeting', async () => {
    const data = {
      meetingId: '1',
    };

    ClientAPI.instance.delete.mockResolvedValue(OUTPUT_MOCK);

    const resp = await ClientAPI.deleteMeeting(data);

    expect(resp).toEqual(OUTPUT_MOCK);
  });
});
