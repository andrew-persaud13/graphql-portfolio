import React from 'react';
import BaseLayout from '@/layouts/BaseLayout';

const Cv = () => (
  <BaseLayout>
    <div className='row mt-4'>
      <div className='col-md-10 offset-md-2'>
        <iframe
          style={{ width: '100%', height: '800px' }}
          src='/andrew_persaud_resume.pdf'
        ></iframe>
      </div>
    </div>
  </BaseLayout>
);

export default Cv;
