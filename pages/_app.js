import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;

/*

If you need props here

import App from 'next/app'

MyApp.getInitialProps = async (context) => {
  const initialProps = App.getInitialProps && await App.getInitialProps(context)

  return { pageProps: { appData: 'Put the props from MyApp here then spread the components own props', ...initialProps } }
}


*/
