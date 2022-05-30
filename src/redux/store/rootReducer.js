import { combineReducers } from 'redux';

import auth from 'redux/slices/authSlice';
import profile from 'redux/slices/profileSlice';
import post from 'redux/slices/postSlice';
import friendsPosts from 'redux/slices/friendsPostSlice';
import comment from 'redux/slices/commentSlice';
import reaction from 'redux/slices/reactionSlice';
import meeting from 'redux/slices/meetingSlice';

export default combineReducers({
  auth,
  profile,
  post,
  friendsPosts,
  comment,
  reaction,
  meeting,
});
