import { Link } from "react-router-dom"
import empty from '../assets/empty.svg'
export default function Emptypage() {
  return (
    <div className="empty_page">
      <img src={empty} alt="" />
      <h2>Упс, здесь ещё ничего нет!</h2>
      <button>
        <Link to="/">Поиск Вакансий</Link>
      </button>
    </div>
  )
}
