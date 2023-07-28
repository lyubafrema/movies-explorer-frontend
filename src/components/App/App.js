import Header from '../Header/Header';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import '../../index.css';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isServerErr, setIsServerErr] = useState(false);
  const [isServerOk, setIsServerOk] = useState(false);
  const [apiErr, setApiErr] = useState({ register: {}, login: {}, profile: {}, movies: {} });
  const [isSubmitOk, setIsSubmitOk] = useState(true);

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
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem('token');
          }
          console.log(err);
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false);
    }
  }, [])

  // получаем информацию о пользователе и фильмы из нашего api
  useEffect(() => {
    isLogged &&
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false))
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
          })
          .finally(() => setIsLoading(false))
      }
    }
  }, [isLogged, apiErr]);

  // при логине сохраняем полученные фильмы в ls
  useEffect(() => {
    isLogged &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLogged]);

  // функция авторизации
  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        if (!res) {
          console.log('Неправильный логин или пароль.');
        }
        if (res.token) {
          setIsLogged(true);
          localStorage.setItem('token', res.token);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setApiErr({ ...apiErr, login: err });
        setIsSubmitOk(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // функция регистрации
  const onRegister = (email, password, name) => {
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
        setIsSubmitOk(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        setIsSubmitOk(false);
      })
      .finally(() => setIsLoading(false));
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {(location.pathname === "/" || "/movies" || "/saved-movies" || "/profile") && <Header isLogged={isLogged} />}
        <main className='main'>
          {isLoading
            ? (<Preloader />)
            :
            (<Routes>
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
                  isSubmitOk={isSubmitOk}
                  isLoading={isLoading}
                />} />
              <Route path="/signup"
                element={<Register
                  onRegister={onRegister}
                  isLogged={isLogged}
                  apiErr={apiErr}
                  isSubmitOk={isSubmitOk}
                  isLoading={isLoading}
                />} />
              <Route path="*" element={<NotFound />} />
            </Routes>)}
        </main>
        {(location.pathname === "/" || "/movies" || "/saved-movies") && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
