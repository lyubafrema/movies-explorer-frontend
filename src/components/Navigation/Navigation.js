import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {

  return (
    <div className='navigation'>
      <nav className='navigation__menu'>
        <div className='navigation__link-container'>
          <Link to='/signup' className='navigation__link' >Регистрация</Link>
          <Link to='/signin' className='navigation__link navigation__link_blue ' >Войти</Link>
        </div>
      </nav>
    </div>
  )
}