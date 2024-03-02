import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePagination }) => {
  return (
    <div>
      <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>Prev</button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => handlePagination('next')} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Pagination;





