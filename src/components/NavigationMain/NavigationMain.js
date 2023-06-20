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
      <button className='navigation__burger' type='type' onClick={() => setIsMenuShow((prev) => !prev)}>
        {isMenuShow ?
          <img className='navigation__burger-icon navigation__burger-icon_closed' src={burgerOpen} alt="Крестик." />
          :
          <img className='navigation__burger-icon' src={burgerClose} alt="Три горизонтальные полоски." />
        }
      </button>
      {isMenuShow && <NavigationContextMenu />}
      <nav className='navigation__link-container navigation__link-container_path_main'>
        <NavLink to='/movies' className={({ isActive }) => `navigation__link navigation__link_path_main ${isActive ? 'navigation__link_active' : ''}`} >Фильмы</NavLink>
        <NavLink to='/saved-movies' className={({ isActive }) => `navigation__link navigation__link_path_main ${isActive ? 'navigation__link_active' : ''}`}>Сохранённые фильмы</NavLink>
        <Link to='/profile' className='navigation__link navigation__link_color_white'>Аккаунт</Link>
      </nav>
    </div>
  )
}