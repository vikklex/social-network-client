import React from 'react';

function UserInfo({ user }) {
  const birthday = user.birthday
    ? new Date(user.birthday).toLocaleDateString()
    : '';

  return (
    <div
      className='site-card-border-less-wrapper profile'
      style={{ marginTop: 15 }}
    >
      {user.birthday && (
        <p>
          <span className='personal_primary_key'>Birthday:</span>
          <span className='personal_primary_value'>{birthday}</span>
        </p>
      )}

      {user.city && (
        <p>
          <span className='personal_primary_key'>City:</span>
          <span className='personal_primary_value'>{user.city}</span>
        </p>
      )}
      {user.from && (
        <p>
          <span className='personal_primary_key'>From:</span>
          <span className='personal_primary_value'>{user.from}</span>
        </p>
      )}

      {user.gender && (
        <p>
          <span className='personal_primary_key'>Gender:</span>
          <span className='personal_primary_value'>{user.gender}</span>
        </p>
      )}

      {user.relationships && (
        <p>
          <span className='personal_primary_key'>Relationships:</span>
          <span className='personal_primary_value'>{user.relationships}</span>
        </p>
      )}

      {user.desc && (
        <p>
          <span className='personal_primary_key'>About:</span>
          <span className='personal_primary_value'>{user.desc}</span>
        </p>
      )}
    </div>
  );
}

export default UserInfo;
