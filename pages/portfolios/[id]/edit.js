import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import NewPortfolioForm from '@/components/forms/NewPortfolioForm';

import { useGetPortfolio, useUpdatePortfolio } from '@/apollo/actions';
import BaseLayout from '@/layouts/BaseLayout';

const PortfolioEdit = withAuth(() => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useGetPortfolio({
    variables: { id },
  });
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const portfolio = (data && data.portfolio) || {};
  const errorMessage = error => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      'Oops something went wrong...'
    );
  };

  const handleSubmit = async data => {
    await updatePortfolio({ variables: { id, ...data } });
    toast.success('Portfolio successfully updated!', { autoClose: 2000 });
  };

  if (loading) return 'Loading...';
  return (
    <BaseLayout>
      <div className='bwm-form mt-5'>
        <div className='row'>
          <div className='col-md-5 mx-auto'>
            <h1 className='page-title'>Edit Portfolio</h1>
            <NewPortfolioForm portfolio={portfolio} onSubmit={handleSubmit} />
            {error && (
              <div className='alert alert-danger'>{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}, ['admin', 'instructor']);

export default withApollo(PortfolioEdit);
