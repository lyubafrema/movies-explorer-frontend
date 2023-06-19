import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__info">
        <li>
          <h3 className="about__info_title">Дипломный проект включал 5 этапов</h3>
          <p className="about__info_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li>
          <h3 className="about__info_title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__info_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about__infographics">
        <p className="about__infographics_weeks">1 неделя</p>
        <p className="about__infographics_weeks">4 недели</p>
        <p className="about__infographics_tech">Back-end</p>
        <p className="about__infographics_tech">Front-end</p>
      </div>
    </section>
  )
}