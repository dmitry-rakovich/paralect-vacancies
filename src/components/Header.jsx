import { NavLink } from "react-router-dom"
import logo from '../assets/logo.svg'
export default function Header() {
  return (
    <header className="header">
      <img className="header_logo" src={logo} alt="logo" />
      <nav className="header_menu">
        <NavLink to='/'>Поиск Вакансий</NavLink>
        <NavLink to='/favorites'>Избранное</NavLink>
      </nav>
    </header>
  )
}
