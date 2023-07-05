import studentPhoto from '../../../images/student_photo.jpg';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className="student">
      <div className="student__wrap">
        <h2 className="student__title">Студент</h2>
        <div className="student__container">
          <div className='student__main-info'>
            <h3 className="student__name">Любовь</h3>
            <p className="student__info">Фронтенд-разработчик, 25 лет</p>
            <p className="student__about">Я родилась и живу в Ярославле, закончила факультет экономики ЯрГУ. Я люблю слушать тру-крайм подкасты, а ещё увлекаюсь вязанием. Начала изучать программирование в прошлом году. Сейчас заканчиваю курс по веб-разработке и скоро планирую приступать к поиску работы.</p>
            <a className='student__link' href="https://github.com/lyubafrema" target='blanc'>Github</a>
          </div>
          <img className="student__image" src={studentPhoto} alt="Фото студента." />
        </div>
        <h4 className='student__portfolio'>Портфолио</h4>
        <ul className='student__portfolio-list'>
          <li className='student__portfolio-item'>
            <a className='student__portfolio-item_part_link' href="https://github.com/lyubafrema/how-to-learn" target='blanc'>
              <p className='student__portfolio-item_part_text'>Статичный сайт</p>
              <span>↗</span>
            </a>
          </li>
          <li className='student__portfolio-item'>
            <a className='student__portfolio-item_part_link' href="https://lyubafrema.github.io/russian-travel/" target='blanc'>
              <p className='student__portfolio-item_part_text'>Адаптивный сайт</p>
              <span>↗</span>
            </a>
          </li>
          <li className='student__portfolio-item'>
            <a className='student__portfolio-item_part_link' href="https://lyubafrema.nomoredomains.monster/" target='blanc'>
              <p className='student__portfolio-item_part_text'>Одностраничное приложение</p>
              <span>↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

  )
}