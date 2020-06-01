import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginate = () => {

  const data = Array(Math.ceil(500 + Math.random() * 500));
  const dataSet = data.map((a, i) => ("Record " + (i + 1)));
  const pageSize = 50;
  const pageCount = Math.ceil(this.dataSet.length / this.pageSize);
  const [currentPage, setCurrentPage] = useState(0);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  }

  return (
    <div>

      {
        dataSet
        .slice(currentPage*pageSize, (currentPage+1)*pageSize)
        .map((data, i) => 
          <div className="data-slice" key={i}>
            {data}
          </div>
        )
      }

      <div className="pagination-wrapper">
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={currentPage <= 0}>
            <PaginationLink
              onClick={e => handleClick(e, currentPage - 1)}
              previous
              href="#"
            />
          </PaginationItem>
          {data.map((page, i) => 
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={e => handleClick(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem disabled={currentPage >= pageCount - 1}>
            <PaginationLink
              onClick={e => handleClick(e, currentPage + 1)}
              next
              href="#"
            />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
    
  );
}

export default Paginate;