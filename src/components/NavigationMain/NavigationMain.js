import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import burgerOpen from '../../images/burger-open.svg';
import burgerClose from '../../images/burger-close.svg';
import NavigationContextMenu from './ContextMenu/ContextMenu';
import '../Navigation/Navigation.css';

export default function NavigationMain() {
  const [isMenuShow, setIsMenuShow] = useState(false);

  return (
    <div className='navigation'>
      <button className='navigation__burger' onClick={() => setIsMenuShow((prev) => !prev)}>
        {isMenuShow ?
          <img className='navigation__burger_icon navigation__burger_icon-close' src={burgerOpen} alt="Крестик." />
          :
          <img className='navigation__burger_icon' src={burgerClose} alt="Три горизонтальные полоски." />
        }
      </button>
      {isMenuShow && <NavigationContextMenu />}
      <nav className='navigation__link-container navigation__link-container_main'>
        <NavLink to='/movies' className={({ isActive }) => `navigation__link navigation__link_main ${isActive ? 'navigation__link_main-active' : ''}`} >Фильмы</NavLink>
        <NavLink to='/saved-movies' className={({ isActive }) => `navigation__link navigation__link_main ${isActive ? 'navigation__link_main-active' : ''}`}>Сохранённые фильмы</NavLink>
        <Link to='/profile' className='navigation__link navigation__link_white'>Аккаунт</Link>
      </nav>
    </div>
  )
}