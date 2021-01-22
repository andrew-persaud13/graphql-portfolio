import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Replier = ({ isOpen, closeBtn, onSubmit, replyTo, hasTitle = false }) => {
  const [replyState, setReplyState] = useState({
    title: '',
    content: '',
  });

  const handleChange = e =>
    setReplyState({ ...replyState, [e.target.name]: e.target.value });

  const resetReplyState = () => setReplyState({ title: '', content: '' });

  const handleSubmit = () => {
    if ((hasTitle && !replyState.title) || !replyState.content) {
      return toast.error('Please provide title and content', {
        autoClose: 2000,
      });
    }
    onSubmit(replyState, resetReplyState);
  };

  return (
    <div className={`reply-controls ${isOpen ? 'is-open' : ''}`}>
      <div className='reply-area'>
        {replyTo && (
          <div className='reply-to'>
            Reply To: <span className='text ml-2'>{replyTo}</span>
          </div>
        )}
        {hasTitle && (
          <div className='fj-editor-input'>
            <input
              name='title'
              placeholder='Topic title'
              type='text'
              value={replyState.title}
              onChange={handleChange}
            ></input>
          </div>
        )}
        <div className='fj-editor'>
          <div className='fj-editor-textarea-wrapper'>
            <textarea
              name='content'
              placeholder='Type here'
              value={replyState.content}
              onChange={handleChange}
              value={replyState.content}
            ></textarea>
          </div>
          <div className='fj-editor-preview-wrapper'>
            <div className='preview'>
              <p></p>
            </div>
          </div>
        </div>
        <div className='submit-area'>
          <div className='send mr-auto'>
            <button
              href='#'
              className='btn btn-main bg-blue py-2 ttu'
              onClick={handleSubmit}
            >
              Reply
            </button>
            {closeBtn()}
          </div>
          <div>
            <a className='btn py-2 ttu gray-10'>hide preview</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replier;
