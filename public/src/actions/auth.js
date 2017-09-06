import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

export function loginUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then(response => {
                cookie.save('token', response.data.token, { path: '/' });
                cookie.save('user', response.data.user, { path: '/' });
                dispatch({ type: AUTH_USER });
                window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
            })
            .catch(error => {
                errorHandler(dispatch, error.response, AUTH_ERROR);
            });
    };
}
  
export function registerUser({ email, firstName, lastName, password }) {
    return function (dispatch) {
        axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
            .then(response => {
                cookie.save('token', response.data.token, { path: '/' });
                cookie.save('user', response.data.user, { path: '/' });
                dispatch({ type: AUTH_USER });
                window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
            })
            .catch(error => {
                errorHandler(dispatch, error.response, AUTH_ERROR);
            });
    };
}
  
export function logoutUser(error) {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER, payload: error || '' });
        cookie.remove('token', { path: '/' });
        cookie.remove('user', { path: '/' });

        window.location.href = `${CLIENT_ROOT_URL}/login`;
    };
}