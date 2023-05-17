import axios from "axios";

export function loginUser (data) {
  const request = axios.post('/api/accounts/', data)
    .then(response => response.data).catch(err => err.response.data)
  return {
    type: 'LOGIN_USER',
    payload: request,
  }
}

export function registerUser (data) {
  const request = axios.post('/api/accounts/signup/', data)
    .then(response =>  response.data ).catch(err => err.response.data)
  return {
    type: 'REGISTER_USER',
    payload: request,
  }
}

export function authUser() {
  const request = axios.get('/api/accounts/')
    .then(response =>  response.data ).catch(err => err.response.data)
  return {
    type: 'AUTH_USER',
    payload: request,
  }
}