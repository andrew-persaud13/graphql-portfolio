import { ToastContainer } from 'react-toastify';

import Navbar from '../components/shared/NavBar';
import Hero from '../components/shared/Hero';
import Footer from '../components/shared/Footer';

const BaseLayout = ({ children, page = '' }) => {
  return (
    <div className='portfolio-app'>
      <Navbar />
      {page === 'Home' && <Hero />}
      <div className='container pb-5'>{children}</div>
      {page === 'Home' && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default BaseLayout;
