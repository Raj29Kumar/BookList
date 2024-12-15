import React from 'react';
import '../App.css';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination-container">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button previous"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => paginate(page)}
          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button next"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
