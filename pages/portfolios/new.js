import { useRouter } from 'next/router';
import withApollo from '../../hoc/withApollo';
import withAuth from '../../hoc/withAuth';
import NewPortfolioForm from '../../components/forms/NewPortfolioForm';

import { useCreatePortfolio } from '../../apollo/actions';
import BaseLayout from '../../layouts/BaseLayout';

const PortfolioNew = withAuth(() => {
  const router = useRouter();
  const errorMessage = error => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      'Oops something went wrong...'
    );
  };

  const [createPortfolio, { error }] = useCreatePortfolio();

  const handleSubmit = async data => {
    await createPortfolio({ variables: data });
    return router.push('/portfolios');
  };

  return (
    <BaseLayout>
      <div className='bwm-form mt-5'>
        <div className='row'>
          <div className='col-md-5 mx-auto'>
            <h1 className='page-title'>Create New Portfolio</h1>
            <NewPortfolioForm onSubmit={handleSubmit} />
            {error && (
              <div className='alert alert-danger'>{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}, ['admin', 'instructor']);

export default withApollo(PortfolioNew);
