import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './actionTypes';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(token) {
  return dispatch => {
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  }
}

export function setUser(token) {
  return dispatch => {
    dispatch(login(token))
  }
}
