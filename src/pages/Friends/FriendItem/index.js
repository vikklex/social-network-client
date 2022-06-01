import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';

import ClientAPI from 'services/ClientAPI';

import FriendDescription from './components/FriendDescription';
import FriendInfo from './components/FriendInfo';

const FriendItem = ({ id, content }) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onSuccess = (resp) => {
      setUser(resp.data.user);
      setIsReady(true);
    };

    ClientAPI.getUser(id).then(onSuccess);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <FriendDescription user={user} />
      {!content && <FriendInfo user={user} />}
    </>
  );
};

export default FriendItem;
