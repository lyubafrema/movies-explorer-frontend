import { MOVIES_URL } from "./constants";

class MoviesApi {
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

  // загрузка карточек с сервера
  getMovies() {
    return this._request(`${this._url}`, {
      headers: this._headers
    });
  }
}

export const moviesApi = new MoviesApi({
  url: `${MOVIES_URL}beatfilm-movies`,
  headers: {
    'Content-Type': 'application/json'
  }
});