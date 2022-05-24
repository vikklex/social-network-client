import moment from 'moment';

import getReactionsByDate from './getReactionsByDay';

const LIKE_TYPE = 'like';
const DISLIKE_TYPE = 'dislike';

describe('Reactions by day', () => {
  it('Get likes by day', () => {
    const date = moment().toISOString();

    const input = [
      {
        createdAt: date,
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },

      {
        createdAt: date,
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },
    ];

    const output = [
      {
        contentType: 'post',
        createdAt: date,
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },

      {
        contentType: 'post',
        createdAt: date,
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },
    ];

    expect(getReactionsByDate(input, LIKE_TYPE)).toEqual(output);
  });

  it('Get dislikes by day', () => {
    const date = moment().toISOString();

    const input = [
      {
        createdAt: date,
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },

      {
        createdAt: date,
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },
    ];

    const output = [
      {
        contentType: 'post',
        createdAt: date,
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },

      {
        contentType: 'post',
        createdAt: date,
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },
    ];

    expect(getReactionsByDate(input, LIKE_TYPE)).toEqual(output);
  });
});
