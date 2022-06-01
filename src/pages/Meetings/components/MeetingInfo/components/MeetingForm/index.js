import React from 'react';

import { Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const MeetingForm = ({ handleDelete, handleEdit }) => {
  return (
    <Form style={{ display: 'flex' }} className='meeting__form'>
      <Form.Item>
        <DeleteOutlined onClick={handleDelete} />
      </Form.Item>

      <Form.Item style={{ marginLeft: 15 }}>
        <EditOutlined onClick={handleEdit} />
      </Form.Item>
    </Form>
  );
};

export default MeetingForm;
