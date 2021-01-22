import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

const NewPortfolioForm = ({ onSubmit, portfolio = {} }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: portfolio,
  });

  //manually register dates
  useEffect(() => {
    register({ name: 'startDate' }); //register manually since datepicker not traditional input
    register({ name: 'endDate' });
  }, [register]);

  //manually populate dates for edit
  useEffect(() => {
    if (portfolio.startDate) {
      setStartDate(new Date(+portfolio.startDate));
    }

    if (portfolio.endDate) {
      setEndDate(new Date(+portfolio.endDate));
    }
  }, [portfolio]);

  //can also return a function that takes the date and access key and setter via closure
  const handleDateChange = (date, key, setter) => {
    setValue(
      key,
      date ? new Date(date.setHours(0, 0, 0, 0)).toISOString() : date
    );
    setter(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          ref={register}
          name='title'
          type='text'
          className='form-control'
          id='title'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='company'>Company</label>
        <input
          ref={register}
          name='company'
          type='text'
          className='form-control'
          id='company'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='companyWebsite'>Company Website</label>
        <input
          ref={register}
          name='companyWebsite'
          type='text'
          className='form-control'
          id='companyWebsite'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='location'>Location</label>
        <input
          ref={register}
          name='location'
          type='text'
          className='form-control'
          id='location'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='jobTitle'>Job Title</label>
        <input
          ref={register}
          name='jobTitle'
          type='text'
          className='form-control'
          id='jobTitle'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          ref={register}
          name='description'
          rows='5'
          type='text'
          className='form-control'
          id='description'
        ></textarea>
      </div>

      <div className='form-group'>
        <label htmlFor='street'>Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={date => handleDateChange(date, 'startDate', setStartDate)}
          />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='street'>End Date</label>
        <div>
          <DatePicker
            disabled={!endDate}
            showYearDropdown
            selected={endDate}
            onChange={date => handleDateChange(date, 'endDate', setEndDate)}
          />
        </div>
      </div>
      <div className='form-group'>
        {endDate && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => handleDateChange(null, 'endDate', setEndDate)}
          >
            No End Date
          </button>
        )}
        {!endDate && (
          <button
            type='button'
            className='btn btn-success'
            onClick={() => handleDateChange(new Date(), 'endDate', setEndDate)}
          >
            Set End Date
          </button>
        )}
      </div>

      <button type='submit' className='btn btn-primary'>
        {portfolio.startDate ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default NewPortfolioForm;
