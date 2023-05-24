import PropTypes from 'prop-types'
export default function Pagination({page, setPage }) {
  return (
    <div className='pagination'>
        <button disabled={page < 1} onClick={() => {
        setPage((page) => page - 1)}}>{'<'}</button>
        <button onClick={(e) => setPage(e.target.value)} value={0}>1</button>
        <button onClick={(e) => setPage(e.target.value)} value={1}>2</button>
        <button onClick={(e) => setPage(e.target.value)} value={2}>3</button>
        <button onClick={() => {setPage((page) => page + 1)}}
        >{'>'}</button>
    </div>
  )
}

Pagination.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func,
}
