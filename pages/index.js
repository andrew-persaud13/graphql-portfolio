import Link from 'next/link';
import BaseLayout from '../layouts/BaseLayout';
import withApollo from '../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useGetHighlight } from '../apollo/actions';
import PortfolioCard from '../components/portfolios/PortfolioCard';
import TopicItem from '../components/forum/TopicItem';

const getInititalData = () => {
  const { data } = useGetHighlight({ variables: { limit: 3 } });
  const portfolios = (data && data.highlight.portfolios) || [];
  const topics = (data && data.highlight.topics) || [];

  return {
    portfolios,
    topics,
  };
};

const Home = () => {
  const { portfolios, topics } = getInititalData();
  return (
    <BaseLayout page='Home'>
      <div className='portfolio-app'>
        <div className='container'>
          {/* HOME PAGE STARTS */}
          <section className='section-title'>
            <div className='px-2'>
              <div className='pt-5 pb-4'>
                <h1>Portfolios</h1>
              </div>
            </div>
          </section>
          <section className='pb-5'>
            <div className='row'>
              {portfolios.map(portfolio => (
                <div key={portfolio._id} className='col-md-4'>
                  <Link
                    as={`/portfolios/${portfolio._id}`}
                    href='/portfolios/[id]'
                  >
                    <a className='card-link'>
                      <PortfolioCard portfolio={portfolio} />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <Link href='/portfolios'>
            <a className='btn btn-main bg-blue ttu'>See More Portfolios</a>
          </Link>

          <section className='section-title'>
            <div className='px-2'>
              <div className='pt-5 pb-4'>
                <h1>Ask Me</h1>
              </div>
            </div>
          </section>
          <section className='pb-5'>
            <div className='list-group'>
              {topics.map(topic => (
                <Link
                  key={topic._id}
                  href='/forum/topics/[slug]'
                  as={`/forum/topics/${topic.slug}`}
                >
                  <a
                    className='list-group-item list-group-item-action flex-column align-items-start mt-3 py-3 subtle-shadow no-border mb-5'
                    key={topic._id}
                  >
                    <TopicItem topic={topic} />
                  </a>
                </Link>
              ))}
            </div>
          </section>
          <Link href='/forum/categories'>
            <a className='btn btn-main bg-blue ttu'>See More Posts</a>
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Home, { getDataFromTree });
