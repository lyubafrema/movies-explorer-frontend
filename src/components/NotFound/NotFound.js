import { Link, useNavigate } from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <Link className="not-found__link" onClick={() => navigate(-1, { replace: true })}>Назад</Link>
    </section>
  )
}