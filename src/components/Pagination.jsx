import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';
export default function Pagination({total, setPage}) {
  const pageCount = total > 500 ? 125 : Math.ceil(total / 4)
  return (
      <ReactPaginate 
        className='pagination'
        previousLabel={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.36699 8.00002L10.667 4.70002L9.72399 3.75702L5.48099 8.00002L9.72399 12.243L10.667 11.3L7.36699 8.00002Z" fill="currentColor"/>
          </svg>
        }
        nextLabel={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.63301 7.99996L5.33301 4.69996L6.27601 3.75696L10.519 7.99996L6.27601 12.243L5.33301 11.3L8.63301 7.99996Z" fill="currentColor"/>
          </svg>
        }
        previousClassName="page_item previous"
        previousLinkClassName="page_item"
        nextClassName="page_item next"
        nextLinkClassName="page_item"
        pageClassName="page_item"
        pageLinkClassName="page_link"
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        breakLabel="..."
        activeClassName="active"
        onPageChange={(e) => setPage(() => e.selected)}
        renderOnZeroPageCount={null}
      />
  )
}

Pagination.propTypes = {
  total: PropTypes.number,
  setPage: PropTypes.func
}