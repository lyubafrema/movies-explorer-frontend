import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">© 2023</p>
        <nav className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="blanc">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/Yandex-Practicum" target="blanc">Github</a>
        </nav>
      </div>
    </footer>
  )
}