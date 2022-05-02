import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import { updateUser } from '../../../../redux/actions/profileActions';

const Status = ({ id, user, statusText, setStatusText }) => {
  const dispatch = useDispatch();

  const [visibleInput, setVisibleInput] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);

  const onPressEnter = () => {
    dispatch(updateUser({ status: statusText, id: user.id }));
    setStatusText('');
    setVisibleInput(true);
    setVisibleStatus(false);
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

  const inputDisplay =
    user.status && visibleInput ? { display: 'none' } : { display: 'block' };

  return (
    <>
      {user.status && (
        <span onClick={changeVisibility} style={statusDisplay}>
          {user.status}
        </span>
      )}
      {!id && (
        <Input
          placeholder={user.status || 'Set status...'}
          bordered={false}
          onPressEnter={onPressEnter}
          value={statusText}
          onChange={(event) => setStatusText(event.target.value)}
          style={inputDisplay}
        />
      )}
    </>
  );
};

export default Status;
