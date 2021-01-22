import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

import { useGetPortfolio } from '@/apollo/actions';
import BaseLayout from '@/layouts/BaseLayout';
import { formatDate } from '@/utils/functions';

const PortfolioDetail = ({ query }) => {
  const { data, loading, error } = useGetPortfolio({
    variables: { id: query.id },
  });
  const portfolio = (data && data.portfolio) || {};

  return (
    <BaseLayout>
      <div className='portfolio-detail'>
        <div className='container'>
          <div className='jumbotron'>
            <h1 className='display-3'>{portfolio.title}</h1>
            <p className='lead'>{portfolio.jobTitle}</p>
            <p>
              <a className='btn btn-lg btn-success' href='#' role='button'>
                {portfolio.company}
              </a>
            </p>
          </div>

          <div className='row marketing'>
            <div className='col-lg-6'>
              <h4 className='title'>Location</h4>
              <p className='text'>{portfolio.location}</p>

              <h4 className='title'>Start Date</h4>
              <p className='text'>{formatDate(portfolio.startDate)}</p>
            </div>

            <div className='col-lg-6'>
              {/* TODO: days later... */}
              <h4 className='title'>Days</h4>
              <p className='text'>{portfolio.daysOfExperience}</p>

              <h4 className='title'>End Date</h4>
              <p className='text'>
                {portfolio.endDate
                  ? formatDate(portfolio.endDate)
                  : 'In progress'}
              </p>
            </div>
            <div className='col-md-12'>
              <hr />
              <h4 className='title'>Description</h4>
              <p>{portfolio.description}</p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

PortfolioDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default withApollo(PortfolioDetail, { getDataFromTree });

//--------- USING useRouter import { useRouter } from 'next/router' -------;

// const PortfolioDetail = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   return <div>I am detal page with ID: {id} </div>;
// };

// export default PortfolioDetail;

//How to get dynamic url using class
// class PortFolioDetailClass extends React.Component {
//   //called on the server
//   static getInitialProps({ query }) {
//     return { query };
//   }

//   render() {
//     const { id } = this.props.query;
//     return `Pippins id: ${id}`;
//   }
// }

// export default PortFolioDetailClass;
