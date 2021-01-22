import Link from 'next/link';

import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

import PortfolioCard from '../../components/portfolios/PortfolioCard';
import BaseLayout from '../../layouts/BaseLayout';
import { useGetPortfolios } from '../../apollo/actions';

const Portfolios = () => {
  const { data } = useGetPortfolios();

  const portfolios = (data && data.portfolios) || [];

  return (
    <BaseLayout>
      <div className='container'>
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
      </div>
    </BaseLayout>
  );
};

export default withApollo(Portfolios, { getDataFromTree });
