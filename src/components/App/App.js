import Header from '../Header/Header';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import { useEffect, useState } from 'react';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import { moviesApi } from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import { MAIN_URL } from '../../utils/constants';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isServerErr, setIsServerErr] = useState(false);
  const [isServerOk, setIsServerOk] = useState(false);
  const [apiErr, setApiErr] = useState({ register: {}, login: {}, profile: {}, movies: {} });

  const mainApi = new MainApi({
    url: MAIN_URL,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  // очищаем ошибки
  useEffect(() => {
    setApiErr({ register: {}, login: {}, profile: {}, movies: {} });
  }, [location]);

  // проверяем есть ли токен в локал сторейдж, если да - авторизуем
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            navigate(location.pathname);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem('token');
            setIsLoading(false);
          }
          console.log(err);
        })
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // получаем информацию о пользователе из нашего api
  useEffect(() => {
    isLogged &&
      mainApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })

    isLogged &&
      mainApi.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(err);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  // получаем фильмы из api или ls, если они уже там
  useEffect(() => {
    if (isLogged) {
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
      } else {
        moviesApi
          .getMovies()
          .then((movies) => {
            localStorage.setItem('movies', JSON.stringify(movies));
            setMovies(movies);
            setApiErr({ ...apiErr, movies: {} });
          })
          .catch((err) => {
            console.log(err);
            setApiErr({ ...apiErr, movies: err });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  // при логине сохраняем полученные фильмы в ls
  useEffect(() => {
    isLogged &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLogged]);

  // функция авторизации
  const onLogin = (email, password) => {
    setIsFormLoading(true);
    auth.authorize(email, password)
      .then((res) => {
        if (!res) {
          console.log('Неправильный логин или пароль.');
        }
        if (res.token) {
          setIsLogged(true);
          localStorage.setItem('token', res.token);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        setApiErr({ ...apiErr, login: err });
      })
      .finally(() => setIsFormLoading(false));
  }

  // функция регистрации
  const onRegister = (email, password, name) => {
    setIsFormLoading(true);
    auth.register(email, password, name)
      .then((res) => {
        if (!res) {
          console.log('Что-то пошло не так.');
        }
        if (res) {
          onLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(err);
        setApiErr({ ...apiErr, register: err });
      })
      .finally(() => setIsFormLoading(false));
  }

  // фyнкция обновления данных профиля пользователя
  const handleUpdateProfileInfo = (user) => {
    mainApi.editUserInfo(user)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          email: user.email,
          name: user.name
        });
        setIsServerOk(true);
        setIsServerErr(false);
      })
      .catch((err) => {
        setIsServerOk(false);
        setIsServerErr(true);
        console.log(err);
        setApiErr({ ...apiErr, profile: err });
      })
  };

  // выход из аккаунта пользователя
  const onSignOut = () => {
    localStorage.clear();
    navigate('/', { replace: true });
    setIsLogged(false);
  };

  // сохранить фильм
  const handleSaveMovie = (movie, isSaved, idSaved) => {
    if (isSaved) {
      handleUnsaveMovie(idSaved);
    } else {
      mainApi.saveMovie(movie)
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
        })
        .catch((err) => console.log(err));
    }
  };

  // удалить фильм из сохраненных
  const handleUnsaveMovie = (movie) => {
    const savedMoviesArr = JSON.parse(
      localStorage.getItem('savedMoviesArr')
    );
    mainApi.unsaveMovie(movie._id)
      .then(() => {
        const newListSavedMovies = savedMovies.filter(
          (m) => m._id !== movie._id
        );
        setSavedMovies(newListSavedMovies);
        if (savedMoviesArr) {
          localStorage.setItem('searchedSavedMovies', JSON.stringify(newListSavedMovies));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      {isLoading
        ? <Preloader />
        : (
          <CurrentUserContext.Provider value={currentUser} >
            {(location.pathname === "/" || "/movies" || "/saved-movies" || "/profile") && <Header isLogged={isLogged} />}
            <main className='main'>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/movies" element={<ProtectedRouteElement
                  element={Movies}
                  isLogged={isLogged}
                  movies={movies}
                  savedMovies={savedMovies}
                  handleSaveMovie={handleSaveMovie}
                  handleUnsaveMovie={handleUnsaveMovie}
                  apiErr={apiErr}
                />}
                />
                <Route path="/saved-movies"
                  element={<ProtectedRouteElement
                    element={SavedMovies}
                    isLogged={isLogged}
                    savedMovies={savedMovies}
                    handleUnsaveMovie={handleUnsaveMovie}
                    handleSaveMovie={handleSaveMovie}
                  />}
                />
                <Route path="/profile" element={<ProtectedRouteElement
                  element={Profile}
                  isLogged={isLogged}
                  onSignOut={onSignOut}
                  onUpdateProfile={handleUpdateProfileInfo}
                  isServerErr={isServerErr}
                  setIsServerErr={setIsServerErr}
                  isServerOk={isServerOk}
                  setIsServerOk={setIsServerOk}
                  apiErr={apiErr}
                  isLoading={isLoading}
                />} />
                <Route path="/signin"
                  element={<Login
                    onLogin={onLogin}
                    isLogged={isLogged}
                    apiErr={apiErr}
                    isFormLoading={isFormLoading}
                  />} />
                <Route path="/signup"
                  element={<Register
                    onRegister={onRegister}
                    isLogged={isLogged}
                    apiErr={apiErr}
                    isFormLoading={isFormLoading}
                  />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            {(location.pathname === "/" || "/movies" || "/saved-movies") && <Footer />}
          </CurrentUserContext.Provider>
        )}
    </div>
  );
}

export default App;
