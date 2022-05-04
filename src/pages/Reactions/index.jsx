import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Statistic, Row, Col, Card } from 'antd';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import { getAllReactionsForUser } from 'redux/actions/reactionActions';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import getReactionsData from 'utils/getReactionsData';
import { LIKE } from 'utils/Constants';
import { DISLIKE } from 'utils/Constants';
import ReactionTable from './ReactionTable';

const Reactions = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  useEffect(() => {
    dispatch(getAllReactionsForUser(profile.id)).then((data) => {
      const like = data.filter((reaction) => reaction.reactionType === LIKE);
      setLikes(like);

      const dislike = data.filter(
        (reaction) => reaction.reactionType === DISLIKE,
      );
      setDislikes(dislike);
    });
  }, [profile.id, dispatch]);

  const likeReaction = getReactionsData(likes, LIKE);
  const dislikeReaction = getReactionsData(dislikes, DISLIKE);

  const positiveData = [];
  const negativeData = [];

  likeReaction.map((result) => {
    const obj = {};
    obj.name = `${result.userName}`;
    obj.value = result.sum;
    positiveData.push(obj);
  });

  dislikeReaction.map((result) => {
    const obj = {};
    obj.name = `${result.userName} `;
    obj.value = result.sum;
    negativeData.push(obj);
  });

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
        data={positiveData}
        title={'Likes:'}
        color={'#3CB371'}
      />

      <ReactionTable
        reaction={dislikeReaction}
        data={negativeData}
        title={'Dislikes:'}
        color={'#6495ED'}
      />
    </Card>
  );
};

export default Reactions;
