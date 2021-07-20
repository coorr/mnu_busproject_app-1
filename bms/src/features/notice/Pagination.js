import React from 'react';
import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, current }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              {current === number ? (
                <span
                  onClick={() => paginate(number)}
                  className="page-link"
                  style={{ backgroundColor: '#1087ff', color: 'white' }}
                >
                  {number}
                </span>
              ) : (
                <span onClick={() => paginate(number)} className="page-link">
                  {number}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
