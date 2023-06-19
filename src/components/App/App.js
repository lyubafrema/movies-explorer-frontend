import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import '../../index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const location = useLocation();

  return (
    <div className='page'>
      {location.pathname === "/" && <Header />}
      {location.pathname === "/movies" && <Header />}
      {location.pathname === "/saved-movies" && <Header />}
      {location.pathname === "/profile" && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname === "/" && <Footer />}
      {location.pathname === "/movies" && <Footer />}
      {location.pathname === "/saved-movies" && <Footer />}
    </div>
  );
}

export default App;
