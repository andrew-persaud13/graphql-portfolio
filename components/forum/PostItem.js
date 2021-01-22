import React from 'react';
import ParentItem from './ParentItem';
import { fromNow } from '@/utils/functions';

const PostItem = ({ onClick, post, className = '', canCreate }) => {
  const { parent = null } = post;
  return (
    <div className={`topic-post ${className}  `}>
      <article>
        <div className='row'>
          <div className='topic-avatar'>
            <div className='main-avatar'>
              <img
                className='avatar subtle-shadow'
                src={post.user.avatar}
              ></img>
            </div>
          </div>
          <div className='topic-body'>
            <div className='topic-header'>
              <div className='topic-meta'>
                <div className='name-container'>
                  <span className='name'>{post.user.username}</span>
                </div>
                <div className='date-container'>
                  <span className='date'>
                    {post.createdAt && fromNow(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className='topic-content'>
              {parent && <ParentItem parent={parent} />}
              <div className='cooked'>
                <p>{post.content}</p>
              </div>
              <section className='post-menu-area'>
                <nav className='post-controls'>
                  <div className='actions'>
                    {canCreate && (
                      <button
                        onClick={() => onClick({ ...post })}
                        className='btn'
                      >
                        reply
                      </button>
                    )}
                  </div>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
