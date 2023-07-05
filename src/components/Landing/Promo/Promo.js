import './Promo.css';
import promoFigure from '../../../images/promo_figure.svg';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrap">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки. </h1>
        <img className="promo__img" src={promoFigure} alt="Серая спираль." />
      </div>
    </section>
  )
}