import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Statistic, Row, Col, Card, Divider, Space, DatePicker } from 'antd';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import {
  getAllReactionsForUser,
  getReactionsFromDate,
} from 'redux/actions/reactionActions';

import NoContent from 'components/NoContent';
import ReactionTable from './ReactionTable';
import ReactionsGender from './ReactionsGender';
import ReactionsDate from './ReactionsDate';
import ReactionsLine from './ReactionsLine';

import getReactionsData from 'utils/getReactionsData';

import { LIKE } from 'utils/Constants';
import { DISLIKE } from 'utils/Constants';

import Statistics from 'assets/img/statistics.jpg';
import moment from 'moment';

const Reactions = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const [dateRange, setDateRange] = useState([
    moment().subtract(20, 'days'),
    moment().add(1, 'day').endOf('day'),
  ]);
  const [dateReactions, setDateReactions] = useState(null);

  useEffect(() => {
    const getReactionsByType = (reactions, type) => {
      return reactions?.filter((reaction) => reaction.reactionType === type);
    };

    dispatch(getAllReactionsForUser(profile.id)).then((data) => {
      setLikes(getReactionsByType(data, LIKE));
      setDislikes(getReactionsByType(data, DISLIKE));
    });
  }, [profile.id, dispatch]);

  useEffect(() => {
    dispatch(getReactionsFromDate(profile.id, dateRange[0], dateRange[1])).then(
      (data) => {
        setDateReactions(data);
      },
    );
  }, [dispatch, profile, dateRange]);

  const likeReaction = getReactionsData(likes, LIKE);
  const dislikeReaction = getReactionsData(dislikes, DISLIKE);

  const getLikes = (likes) => {
    let results = [];

    for (const like of likes) {
      const data = {
        name: `${like.userName}`,
        value: like.sum,
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
        value: getLikesByGender(reactions, 'Male'),
      },
      {
        name: 'Female',
        value: getLikesByGender(reactions, 'Female'),
      },
    ];
  };

  return (
    <Card>
      {!likes.length && !dislikes.length ? (
        <NoContent
          title="You don't have enough reactions to display the statistics"
          description="Maybe you should like someone else's post at first?"
          img={Statistics}
        />
      ) : (
        <>
          <Row gutter={16}>
            <Divider>GENERAL STATISTICS</Divider>
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

          {likes.length !== 0 && (
            <ReactionTable
              reaction={likeReaction}
              data={getLikes(likeReaction)}
              title={'Likes:'}
              color={'#3CB371'}
            />
          )}

          {dislikes.length !== 0 && (
            <ReactionTable
              reaction={dislikeReaction}
              data={getLikes(dislikeReaction)}
              title={'Dislikes:'}
              color={'#6495ED'}
            />
          )}

          <Divider style={{ marginTop: '10%' }}>GENDER</Divider>

          <Row style={{ width: '80%' }}>
            {likes.length !== 0 && (
              <Col span={12}>
                <ReactionsGender
                  data={getReactionsByGender(likeReaction)}
                  color={'#FF69B4'}
                  type='Likes'
                />
              </Col>
            )}

            {dislikes.length !== 0 && (
              <Col span={12}>
                <ReactionsGender
                  data={getReactionsByGender(dislikeReaction)}
                  color={'#87CEEB'}
                  type='Dislikes'
                />
              </Col>
            )}
          </Row>

          <Divider style={{ marginTop: '10%', marginBottom: '5%' }}>
            REACTIONS OVER A PERIOD OF TIME
          </Divider>

          <Row>
            <Space direction='vertical' size={12}>
              <DatePicker.RangePicker
                value={dateRange}
                onChange={(value) => setDateRange(value)}
              />
            </Space>

            <ReactionsLine
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              reactions={dateReactions}
            />
          </Row>

          <Divider style={{ marginTop: '15%' }}>REACTIONS BY WEEKDAYS</Divider>

          <Row>
            <ReactionsDate
              reactions={likeReaction}
              type='Likes'
              color='#8884d8'
            />

            <ReactionsDate
              reactions={dislikeReaction}
              type='Dislikes'
              color='#FFA07A'
            />
          </Row>
        </>
      )}
    </Card>
  );
};

export default Reactions;