import { combineReducers } from 'redux';

import auth from './authReducer';
import alert from './alertReducer';
import profile from './profileReducer';
import post from './postReducer';
import comment from './commentReducer';
import friendPosts from './friendsPostReducer';
import reaction from './reactionReducer';
import meeting from './meetingReducer';

export default combineReducers({
  auth,
  alert,
  profile,
  post,
  friendPosts,
  comment,
  reaction,
  meeting,
});
