import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '10px 15px',
          borderRadius: '5px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ccc',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => paginate(page)}
          style={{
            padding: '10px 15px',
            borderRadius: '5px',
            backgroundColor: currentPage === page ? '#007bff' : '#f8f9fa',
            color: currentPage === page ? '#fff' : '#000',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '10px 15px',
          borderRadius: '5px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ccc',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
