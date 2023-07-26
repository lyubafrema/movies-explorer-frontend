export default class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  // метод проверки ответа от сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(`Произошла ошибка: ${res}`);
    return Promise.reject(`Статус ошибки: ${res.status}`);
  }

  // универсальный метод запроса
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    });
  }

  editUserInfo({ email, name }) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        email,
        name
      })
    });
  }

  getSavedMovies() {
    return this._request(`${this._url}/movies`, {
      headers: this._headers
    });
  }

  saveMovie(movie) {
    // console.log(movie);
    return this._request(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      }),
    });
  }

  unsaveMovie(id) {
    return this._request(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers
    });
  }
}
