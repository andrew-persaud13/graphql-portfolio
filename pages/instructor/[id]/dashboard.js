import { useRouter } from 'next/router';
import Link from 'next/link';
import withApollo from '../../../hoc/withApollo';
import withAuth from '../../../hoc/withAuth';
import BaseLayout from '../../../layouts/BaseLayout';
import { Card, Button } from 'react-bootstrap';
import { getDataFromTree } from '@apollo/react-ssr';

import { useGetUserPortfolios, useDeletePortfolio } from '@/apollo/actions';
import { formatDate } from '@/utils/functions';

const InstructorDashboard = withAuth(
  () => {
    const { data } = useGetUserPortfolios();
    const userPortfolios = (data && data.userPortfolios) || [];

    const [deletePortfolio] = useDeletePortfolio();

    const confirmDelete = id => {
      if (confirm('Are you sure you want to delete this portfolio?')) {
        deletePortfolio({ variables: { id } });
      }
    };

    return (
      <BaseLayout>
        <div className='bwm-form mt-5'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='page-title'>Instructor Portfolios</h1>
              {userPortfolios.map(portfolio => (
                <Card key={portfolio._id} className='mb-2'>
                  <Card.Header>{portfolio.title}</Card.Header>
                  <Card.Body>
                    <Card.Title>{portfolio.jobTitle}</Card.Title>
                    <Card.Text>
                      {formatDate(portfolio.startDate)} -{' '}
                      {portfolio.endDate
                        ? formatDate(portfolio.endDate)
                        : 'Present'}
                    </Card.Text>
                    <Link
                      href='/portfolios/[id]/edit'
                      as={`/portfolios/${portfolio._id}/edit`}
                    >
                      <a className='btn btn-warning mr-1'>Update</a>
                    </Link>
                    <Button
                      variant='danger'
                      onClick={() => confirmDelete(portfolio._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  },
  ['admin', 'instructor'],
  { ssr: true }
);

export default withApollo(InstructorDashboard, { getDataFromTree });

//sending on server, server doesnt have cookie
