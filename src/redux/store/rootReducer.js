import { combineReducers } from 'redux';

import auth, { logout } from 'redux/slices/authSlice';
import profile from 'redux/slices/profileSlice';
import post from 'redux/slices/postSlice';
import friendsPosts from 'redux/slices/friendsPostSlice';
import comment from 'redux/slices/commentSlice';
import reaction from 'redux/slices/reactionSlice';
import meeting from 'redux/slices/meetingSlice';
import conversation from 'redux/slices/conversationSlice';
import message from 'redux/slices/messageSlice';

const appReducer = combineReducers({
  auth,
  profile,
  post,
  friendsPosts,
  comment,
  reaction,
  meeting,
  conversation,
  message,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
