import React from 'react';
import { fromNow, shortify } from '../../utils/functions';
const TopicItem = ({ topic }) => {
  return (
    <>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1 black'>{topic.title}</h5>
        <small className='text-muted'>{fromNow(topic.createdAt)}</small>
      </div>
      <p className='mb-1'>{shortify(topic.content)}</p>
      <div className='avatar-container my-2'>
        <img src={topic.user.avatar} className='avatar-image mr-2'></img>
        <span className='avatar-title'>{topic.user.username}</span>
      </div>
    </>
  );
};

export default TopicItem;
