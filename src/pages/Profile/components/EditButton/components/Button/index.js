import React from 'react';

import { Button } from 'antd';

const EditBtn = ({ handleClick }) => {
  return (
    <Button type='primary' onClick={handleClick} className='edit__button'>
      Edit profile
    </Button>
  );
};

export default EditBtn;
