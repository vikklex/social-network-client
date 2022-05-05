import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Statistic, Row, Col, Card, Divider } from 'antd';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import { getAllReactionsForUser } from 'redux/actions/reactionActions';

import ReactionTable from './ReactionTable';
import ReactionsGender from './ReactionsGender';
import ReactionsDate from './ReactionsDate';

import getReactionsData from 'utils/getReactionsData';
import { getPercentValue } from 'utils/getPercentValue';

import { LIKE } from 'utils/Constants';
import { DISLIKE } from 'utils/Constants';

const Reactions = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  useEffect(() => {
    const getReactionsByType = (reactions, type) => {
      return reactions?.filter((reaction) => reaction.reactionType === type);
    };

    dispatch(getAllReactionsForUser(profile.id)).then((data) => {
      setLikes(getReactionsByType(data, LIKE));
      setDislikes(getReactionsByType(data, DISLIKE));
    });
  }, [profile.id, dispatch]);

  const likeReaction = getReactionsData(likes, LIKE);
  const dislikeReaction = getReactionsData(dislikes, DISLIKE);

  const getLikes = (likes) => {
    let results = [];

    for (const like of likes) {
      const data = {
        name: `${like.userName}`,
        value: getPercentValue(like.sum, likes.length),
      };

      results.push(data);
    }

    return results;
  };

  const getLikesByGender = (reactions, gender) => {
    return reactions.reduce(
      (result, reaction) =>
        reaction.gender === gender ? result + reaction.sum : result,
      0,
    );
  };

  const getReactionsByGender = (reactions) => {
    return [
      {
        name: 'Male',
        value: getLikesByGender(reactions, 'male'),
      },
      {
        name: 'Female',
        value: getLikesByGender(reactions, 'female'),
      },
    ];
  };

  return (
    <Card>
      <Row gutter={16}>
        <Col span={16}>
          <Statistic
            title='Likes all the time'
            value={likes.length}
            prefix={<LikeOutlined />}
          />
        </Col>

        <Col span={8}>
          <Statistic
            title='Dislikes all the time'
            value={dislikes.length}
            prefix={<DislikeOutlined />}
          />
        </Col>
      </Row>

      <ReactionTable
        reaction={likeReaction}
        data={getLikes(likeReaction)}
        title={'Likes:'}
        color={'#3CB371'}
      />

      <ReactionTable
        reaction={dislikeReaction}
        data={getLikes(dislikeReaction)}
        title={'Dislikes:'}
        color={'#6495ED'}
      />

      <Divider style={{ marginTop: '10%' }}>GENDER</Divider>

      <Row style={{ width: '80%' }}>
        <Col span={12}>
          <ReactionsGender
            data={getReactionsByGender(likeReaction)}
            color={'#FF69B4'}
            type='Likes'
          />
        </Col>
        <Col span={12}>
          <ReactionsGender
            data={getReactionsByGender(dislikeReaction)}
            color={'#87CEEB'}
            type='Dislikes'
          />
        </Col>
      </Row>
      <Divider style={{ marginTop: '10%' }}>REACTIONS BY WEEKDAYS</Divider>
      <Row>
        <ReactionsDate reactions={likeReaction} type='Likes' color='#8884d8' />
        <ReactionsDate
          reactions={dislikeReaction}
          type='Dislikes'
          color='#FFA07A'
        />
      </Row>
    </Card>
  );
};

export default Reactions;
