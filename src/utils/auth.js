import { mainUrl } from "./constants";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.text()
    .then((text) => {
      return Promise.reject({
        status: res.status,
        errorText:
          JSON.parse(text).message === 'Validation failed'
            ? JSON.parse(text).validation.body.message
            : JSON.parse(text).message
      });
    });
}

export const register = (email, password, name) => {
  return fetch(`${mainUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
    .then(handleResponse);
}

export const authorize = (email, password) => {
  return fetch(`${mainUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse);
}

export const getContent = (token) => {
  return fetch(`${mainUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
    .then(handleResponse);
}