import React from 'react';

import TextArea from 'antd/lib/input/TextArea';

const TextAreaEditor = ({ onChange, value, comment, user }) => {
  return (
    <TextArea
      className='new__post'
      rows={4}
      onChange={onChange}
      value={value}
      placeholder={!comment && `What's new, ${user.first_name}?`}
      style={!comment && { marginBottom: 15 }}
    />
  );
};

export default TextAreaEditor;
