import React from 'react';
import { useNavigate } from 'react-router-dom';

import { EditOutlined } from '@ant-design/icons';

function UserInfo({ user }) {
  const navigate = useNavigate();

  const birthday = user.birthday
    ? new Date(user.birthday).toLocaleDateString()
    : '';

  const noData =
    !user.birthday ||
    !user.city ||
    !user.from ||
    !user.gender ||
    !user.relationships ||
    !user.desc;

  const displayValue = noData ? 'block' : 'none';

  return (
    <div
      className='site-card-border-less-wrapper profile'
      style={{ marginTop: 15 }}
    >
      <span
        className='personal__photos_upload'
        style={{ display: displayValue }}
        onClick={() => navigate('/edit')}
      >
        <EditOutlined />
        Add info:
      </span>

      {user.birthday && (
        <p style={{ marginTop: 10 }}>
          <span className='personal_primary_key'>Birthday:</span>
          <span className='personal_primary_value'>{birthday}</span>
        </p>
      )}

      {user.city && (
        <p style={{ marginTop: 10 }}>
          <span className='personal_primary_key'>City:</span>
          <span className='personal_primary_value'>{user.city}</span>
        </p>
      )}
      {user.from && (
        <p style={{ marginTop: 10 }}>
          <span className='personal_primary_key'>From:</span>
          <span className='personal_primary_value'>{user.from}</span>
        </p>
      )}

      {user.gender && (
        <p style={{ marginTop: 10 }}>
          <span className='personal_primary_key'>Gender:</span>
          <span className='personal_primary_value'>{user.gender}</span>
        </p>
      )}

      {user.relationships && (
        <p style={{ marginTop: 10 }}>
          <span className='personal_primary_key'>Relationships:</span>
          <span className='personal_primary_value'>{user.relationships}</span>
        </p>
      )}

      {user.desc && (
        <p style={{ marginTop: 10 }}>
          <span className='personal_primary_key'>About:</span>
          <span className='personal_primary_value'>{user.desc}</span>
        </p>
      )}
    </div>
  );
}

export default UserInfo;
