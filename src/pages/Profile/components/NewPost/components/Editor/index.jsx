import React from 'react';
import { Form, Button, Input, Row, Col, Upload } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value, user, props }) => {
  return (
    <>
      <Form.Item>
        <TextArea
          className='new__post'
          rows={4}
          onChange={onChange}
          value={value}
          placeholder={`What's new, ${user.first_name}?`}
          style={{ marginBottom: 15 }}
        />

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
      </Form.Item>

      <Form.Item>
        <Button
          htmlType='submit'
          loading={submitting}
          onClick={onSubmit}
          type='primary'
          style={{
            backgroundColor: 'rgb(206, 206, 206)',
            border: 'none',
          }}
        >
          Share
        </Button>
      </Form.Item>
    </>
  );
};

export default Editor;
