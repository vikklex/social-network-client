import React from 'react';
import { Form, Row, Col, Upload } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';

import TextAreaEditor from './components/Textarea';
import EditorBtn from './components/Button';

const Editor = ({ onChange, onSubmit, value, user, props, comment }) => {
  return (
    <>
      <Form.Item>
        <TextAreaEditor
          onChange={onChange}
          value={value}
          comment={comment}
          user={user}
        />

        {!comment && (
          <Row>
            <Col span={6}>
              <Upload {...props}>
                <PaperClipOutlined
                  className='post__icon'
                  style={{ cursor: 'pointer' }}
                />
              </Upload>
            </Col>
          </Row>
        )}
      </Form.Item>

      <Form.Item>
        <EditorBtn onSubmit={onSubmit} comment={comment} />
      </Form.Item>
    </>
  );
};

export default Editor;
