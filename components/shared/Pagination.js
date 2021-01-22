import React from 'react';
import Pagination from 'react-js-pagination';

const AppPagination = ({ count, postsPerPage, pageNum, onChange }) => {
  return (
    <Pagination
      itemClass='page-item'
      linkClass='page-link'
      activePage={pageNum}
      itemsCountPerPage={postsPerPage}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      onChange={page => onChange(page, postsPerPage)}
    />
  );
};

export default AppPagination;
