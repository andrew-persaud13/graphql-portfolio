import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '../layouts/BaseLayout';
import LoginForm from '../components/forms/LoginForm';
import { useSignInUser } from '../apollo/actions';
import withApollo from '../hoc/withApollo';
import Redirect from '../components/shared/Redirect';
import messages from '@/variables/messages';

const Login = () => {
  let disposeId = useRef(null);
  const [signIn, { data, loading, error }] = useSignInUser();
  const router = useRouter();
  const { message } = router.query;
  const errorMessage = error => {
    console.log(error.graphQLErrors);
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      'Oops something went wrong...'
    );
  };

  const disposeMessage = () => {
    router.replace('/login', '/login', { shallow: true });
  };

  useEffect(() => {
    disposeId.current = setTimeout(() => {
      disposeMessage();
    }, 3000);

    return () => clearTimeout(disposeId.current);
  }, [message]);

  const getMessageCodeStyle = () =>
    messages[message].code === 'error' ? 'danger' : 'success';

  return (
    <BaseLayout>
      <div className='bwm-form mt-5'>
        <div className='row'>
          <div className='col-md-5 mx-auto'>
            <h1 className='page-title'>Login</h1>
            {message && (
              <div className={`alert alert-${getMessageCodeStyle()}`}>
                {messages[message].value}
              </div>
            )}
            <LoginForm
              onSubmit={formData => signIn({ variables: formData })}
              loading={loading}
            />
            {data && data.signIn && <Redirect to='/' />}
            {error && (
              <div className='alert alert-danger'>{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Login);
