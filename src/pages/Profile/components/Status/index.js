import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from 'redux/actions/profileActions';

import StatusInput from './components/StatusInput';

const Status = ({ id, user, statusText, setStatusText }) => {
  const dispatch = useDispatch();

  const [visibleInput, setVisibleInput] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);

  const onPressEnter = () => {
    const onSuccess = () => {
      setStatusText('');
      setVisibleInput(true);
      setVisibleStatus(false);
    };

    dispatch(updateUser({ status: statusText, id: user.id })).then(onSuccess);
  };

  const changeVisibility = () => {
    if (!id) {
      setVisibleInput(false);
      setVisibleStatus(true);
    }
  };

  const statusDisplay = visibleStatus
    ? { display: 'none' }
    : { display: 'block' };

  const inputDisplay = user.status && visibleInput ? 'none' : 'block';

  return (
    <>
      {user.status && (
        <span onClick={changeVisibility} style={statusDisplay}>
          {user.status}
        </span>
      )}
      {!id && (
        <StatusInput
          user={user}
          onPressEnter={onPressEnter}
          statusText={statusText}
          setStatusText={setStatusText}
          inputDisplay={inputDisplay}
        />
      )}
    </>
  );
};

export default Status;
