import { Input } from 'antd';
import React from 'react';

function StatusInput({
  user,
  onPressEnter,
  statusText,
  setStatusText,
  inputDisplay,
}) {
  return (
    <>
      <Input
        placeholder={user.status || 'Set status...'}
        bordered={false}
        onPressEnter={onPressEnter}
        value={statusText}
        onChange={(event) => setStatusText(event.target.value)}
        style={{ display: inputDisplay }}
      />
    </>
  );
}

export default StatusInput;
