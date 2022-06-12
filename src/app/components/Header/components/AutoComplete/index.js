import React from 'react';
import { AutoComplete, Avatar, Col, Row } from 'antd';

import NoAvatar from 'assets/img/noavatar.png';

const { Option } = AutoComplete;

const AutoCompleteHeader = ({
  search,
  onSearch,
  onChange,
  onSelect,
  searchUsers,
  style,
}) => {
  return (
    <AutoComplete
      placeholder='Let search your friend'
      allowClear
      value={search}
      onSearch={onSearch}
      onChange={onChange}
      onSelect={onSelect}
      style={style}
      data-test='autocomplete'
    >
      {searchUsers &&
        searchUsers.map((user) => (
          <Option key={user.id} value={user.first_name}>
            <Row>
              <Col>
                <Avatar
                  src={user.avatar ? user.avatar : NoAvatar}
                  style={{ marginRight: 10 }}
                />
              </Col>

              <Col>
                {user.first_name} {user.last_name}
              </Col>
            </Row>
          </Option>
        ))}
    </AutoComplete>
  );
};

export default AutoCompleteHeader;
