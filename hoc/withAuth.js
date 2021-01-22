import { useCurrentUser } from '../apollo/actions';
import Redirect from '../components/shared/Redirect';
import Loader from '@/components/shared/Loader';

const WithAuth = (WrappedComponent, role, options = { ssr: false }) => {
  function withAuth(props) {
    const { data: { user } = {}, loading, error } = useCurrentUser({
      fetchPolicy: 'network-only',
    });

    if (!loading && (!user || error) && typeof window !== 'undefined') {
      return <Redirect to='/login' query={{ message: 'NOT_AUTHENTICATED' }} />;
    }

    if (user) {
      if (role && role.includes(user.role)) {
        return <WrappedComponent {...props} />;
      }

      return <Redirect to='/login' query={{ message: 'NOT_AUTHORIZED' }} />;
    }

    return <Loader />;
  }

  if (options.ssr) {
    withAuth.getInitialProps = async context => {
      const { req, res } = context;

      if (req) {
        const { user } = req;

        if (!user || (role && !role.includes(user.role))) {
          res.redirect('/login?message=NOT_AUTHENTICATED');
          res.end();
          return {};
        }
      }

      const pageProps =
        (await WrappedComponent.getInitialProps) &&
        WrappedComponent.getInitialProps(context);

      return { ...pageProps };
    };
  }

  return withAuth;
};

export default WithAuth;
