import loader from '../assets/loader.svg'
export default function Loader() {
  return (
    <div className='loader_wrapper'>
        <img className='loader_img' src={loader} width="206" alt="loader image" />
        <p className='loader_text'>Загрузка данных...</p>
    </div>
  )
}
