import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getDataFromTree } from '@apollo/react-ssr';
import { toast } from 'react-toastify';
import { useGetTopics, useCurrentUser } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import BaseLayout from '../../../layouts/BaseLayout';
import Replier from '@/components/shared/Replier';
import { useCreateTopic } from '../../../apollo/actions';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useGetTopics({
    variables: { category: slug },
  });
  const [createTopic] = useCreateTopic();
  const { data: dataU } = useCurrentUser();
  const topics = (data && data.topicsByCategory) || [];
  const user = (dataU && dataU.user) || null;

  return {
    topics,
    user,
    createTopic,
    slug,
    router,
  };
};

const Topics = () => {
  const [isReplyOpen, setReplyOpen] = useState(false);
  const { topics, user, createTopic, slug, router } = useInitialData();

  const onCreateTopic = async (data, done) => {
    try {
      data.forumCategory = slug;
      console.log('herez');
      await createTopic({ variables: data });
      toast('Topic successfully posted!', { autoClose: 3000 });
      setReplyOpen(false);
      done();
    } catch (e) {
      toast.error('Something went wrong...Please try again', {
        autoClose: 2000,
      });
    }
  };

  const goToTopic = slug => () =>
    router.push('/forum/topics/[slug]', `/forum/topics/${slug}`);
  return (
    <BaseLayout>
      <section className='section-title'>
        <div className='px-2'>
          <div className='pt-5 pb-4'>
            <h1>Select A Topic</h1>
            {user && ( //only logged in users can create topics but you can still read them if not logged in so don't use withAuth
              <button
                className='btn btn-primary'
                onClick={() => setReplyOpen(true)}
              >
                Create Topic
              </button>
            )}
            {!user && <i>Log in to create topic</i>}
          </div>
        </div>
      </section>
      <section className='fj-topic-list'>
        <table className='table table-hover '>
          <thead>
            <tr>
              <th scope='col'>Topic</th>
              <th scope='col'>Category</th>
              <th scope='col'>Author</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(topic => (
              <tr key={topic._id} onClick={goToTopic(topic.slug)}>
                <th>{topic.title}</th>
                <td className='category'>{topic.forumCategory.title}</td>
                <td>{topic.user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Replier
          isOpen={isReplyOpen}
          hasTitle
          closeBtn={() => (
            <a
              onClick={() => setReplyOpen(false)}
              className='btn py-2 ttu gray-10'
            >
              Cancel
            </a>
          )}
          onSubmit={onCreateTopic}
        />
      </section>
    </BaseLayout>
  );
};

export default withApollo(Topics, { getDataFromTree });
