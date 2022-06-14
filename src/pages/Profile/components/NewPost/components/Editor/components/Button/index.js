import React from 'react';
import { Button } from 'antd';

const EditorBtn = ({ onSubmit, comment }) => {
  return (
    <Button
      htmlType='submit'
      aria-label='share_button'
      onClick={onSubmit}
      type='primary'
      style={
        !comment
          ? {
              backgroundColor: 'rgb(206, 206, 206)',
              border: 'none',
            }
          : {
              width: '10%',
            }
      }
    >
      Share
    </Button>
  );
};

export default EditorBtn;
