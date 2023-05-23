import loader from '../assets/loader.svg'
export default function Loader() {
  return (
    <div className='loader_wrapper'>
        <img className='loader' src={loader} width="206" alt="loading image" />
    </div>
  )
}
