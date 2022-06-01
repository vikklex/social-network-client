import moment from 'moment';

import getReactionsByDate from 'utils/getReactionsByDay';

const LIKE_TYPE = 'like';
const DISLIKE_TYPE = 'dislike';

describe('Reactions by day', () => {
  it('Get likes by day', () => {
    const date = moment();

    const input = [
      {
        createdAt: date.toISOString(),
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },

      {
        createdAt: date.toISOString(),
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },
    ];

    const output = [
      {
        createdAt: date.toISOString(),
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },

      {
        createdAt: date.toISOString(),
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },
    ];

    expect(getReactionsByDate(date, input)).toEqual(output);
  });

  it('Get dislikes by day', () => {
    const date = moment();

    const input = [
      {
        createdAt: date.toISOString(),
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },

      {
        createdAt: date.toISOString(),
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },
    ];

    const output = [
      {
        createdAt: date.toISOString(),
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },

      {
        createdAt: date.toISOString(),
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: DISLIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },
    ];

    expect(getReactionsByDate(date, input)).toEqual(output);
  });
});
