const SpinningLoader = ({ variant = 'normal' }) => (
  <div className='loader-container'>
    <div className={`sk-chase sk-chase-${variant}`}>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
    </div>
  </div>
);

export default SpinningLoader;
