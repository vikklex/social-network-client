import React from 'react';
import { useSelector } from 'react-redux';
import FriendsPreviewList from 'pages/Profile/components/FriendsPreview/components/List';

const Conversation = ({ conversation }) => {
  const profile = useSelector((state) => state.auth.profile);

  const participants = conversation.participants.filter(
    (m) => m !== profile.id,
  );

  return <FriendsPreviewList users={participants} messenger={true} />;
};

export default Conversation;
