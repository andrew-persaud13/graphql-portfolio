import React from 'react';

const ParentItem = ({ parent }) => {
  return (
    <div className='topic-parent cooked'>
      <div className='topic-parent-inner cooked'>
        <div className='topic-parent-header'>
          <div className='topic-parent-avatar'>
            <div className='main-avatar'>
              <img
                className='avatar subtle-shadow'
                src={parent.user.avatar}
              ></img>
            </div>
          </div>
          <div className='username'>{parent.user.username}</div>
        </div>
        <div className='topic-parent-content'>
          <p>{parent.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ParentItem;
