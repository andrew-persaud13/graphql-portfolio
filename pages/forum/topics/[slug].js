import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import BaseLayout from '../../../layouts/BaseLayout';
import {
  useGetTopic,
  useGetPostsByTopic,
  useCurrentUser,
  useCreatePost,
} from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '../../../components/forum/PostItem';
import Replier from '@/components/shared/Replier';
import AppPagination from '@/components/shared/Pagination';

const getInitialData = (pagination, slug) => {
  const { data } = useGetTopic({ variables: { slug } });
  const { data: dataP, fetchMore } = useGetPostsByTopic({
    variables: { topicSlug: slug, ...pagination },
    pollInterval: 100,
  });
  const { data: dataU } = useCurrentUser();
  const topic = (data && data.topic) || null;
  const postData = (dataP && dataP.postsByTopic) || { posts: [], count: 0 };
  const user = (dataU && dataU.user) || null;
  return {
    topic,
    ...postData,
    user,
    fetchMore,
  };
};

const PostPage = () => {
  const router = useRouter();
  const { slug, pageNum = '1', postsPerPage = '5' } = router.query;
  const [pagination, setPagination] = useState({
    pageNum: parseInt(pageNum),
    postsPerPage: parseInt(postsPerPage),
  });
  const { topic, posts, ...rest } = getInitialData(pagination, slug);

  return (
    <BaseLayout>
      <section className='section-title'>
        <div className='px-2'>
          <div className='pt-5 pb-4'>
            <h1>{topic?.title}</h1>
          </div>
          <Posts
            setPagination={setPagination}
            pagination={pagination}
            {...rest}
            posts={posts}
            topic={topic}
            onPageChange={(pageNum, postsPerPage) => {
              router.push(
                '/forum/topics/[slug',
                `/forum/topics/${slug}?pageNum=${pageNum}&postsPerPage=${postsPerPage}`,
                { shallow: true }
              );
              setPagination({ pageNum, postsPerPage });
            }}
          />
        </div>
      </section>
    </BaseLayout>
  );
};

/* Can use rest spread operator to make the props list shorter   */
const Posts = ({
  posts,
  topic,
  user,
  fetchMore,
  count,
  pagination,
  onPageChange,
  setPagination,
}) => {
  const pageEnd = useRef();
  const [createPost, { error }] = useCreatePost();
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const { pageNum, postsPerPage } = pagination;

  const handleReplyTo = post => {
    setReplyOpen(true);
    setReplyTo(post);
  };

  const handleCreatePost = async (reply, done) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }

    reply.topic = topic._id;
    await createPost({ variables: reply });
    let lastPage = Math.ceil(count / postsPerPage);
    if (count == 0) lastPage === 1; //might not have data yet
    if (lastPage === pageNum) {
      await fetchMore({
        variables: { postsPerPage, pageNum: Math.ceil(count / postsPerPage) },
        updateQuery: (previousResults, { fetchMoreResult }) => {
          console.log(previousResults, fetchMoreResult);
          return Object.assign({}, previousResults, {
            postsByTopic: {
              ...fetchMoreResult.postsByTopic,
            },
          });
        },
      });
    }

    cleanup(done);
  };

  const cleanup = done => {
    toast.success('Post created successfully!', { autoClose: 2000 });
    setReplyOpen(false);
    scrollToBottom();
    done();
  };

  const scrollToBottom = () =>
    pageEnd.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className='mb-5'>
      <div className='fj-post-list'>
        {topic && pageNum === 1 && (
          <PostItem post={topic} className='topic-post-lead' />
        )}
        {posts.map(post => (
          <div className='row' key={post._id}>
            <div className='col-md-9'>
              <PostItem
                canCreate={!!user}
                onClick={handleReplyTo}
                post={post}
                key={post._id}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='row mt-2 mx-0'>
        <div className='col-md-9'>
          <div className='posts-bottom'>
            {user && (
              <div className='pt-2 pb-2'>
                <button
                  onClick={() => handleReplyTo(null)}
                  className='btn btn-lg btn-outline-primary'
                >
                  Create New Post
                </button>
              </div>
            )}
            <div className='pagination-container ml-auto'>
              <AppPagination
                count={count}
                postsPerPage={postsPerPage}
                pageNum={pageNum}
                onChange={onPageChange}
              />
              <label htmlFor='postsPerPage' className='mr-2'>
                Posts per page
              </label>
              <select
                name='postsPerPage'
                onChange={e =>
                  setPagination({
                    ...pagination,
                    [e.target.name]: parseInt(e.target.value),
                  })
                }
                id='postsPerPage'
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div ref={pageEnd}></div>
      <Replier
        isOpen={isReplyOpen}
        replyTo={(replyTo && replyTo.user.username) || topic?.title}
        closeBtn={() => (
          <a
            onClick={() => setReplyOpen(false)}
            className='btn py-2 ttu gray-10'
          >
            Cancel
          </a>
        )}
        onSubmit={handleCreatePost}
      />
    </section>
  );
};

export default withApollo(PostPage, { getDataFromTree });
