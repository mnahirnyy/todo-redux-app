import axios from 'axios';
import { API_URL, CLIENT_ROOT_URL } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = '//localhost:3000';

export function loginUser({ email, password }) {
    return function (dispatch) {
        // Submit email/pass to server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(res => {
                dispatch({ type: AUTH_USER });
                window.localStorage.setItem('token', res.data.token);
                window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
                // history.push('/dashboard');
            })
            .catch(error => {
                errorHandler(dispatch, error.response, AUTH_ERROR);
            });
    };
}

export function registerUser({ email, firstName, lastName, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(res => {
                // cookie.save('token', response.data.token, { path: '/' });
                // cookie.save('user', response.data.user, { path: '/' });
                dispatch({ type: AUTH_USER });
                window.localStorage.setItem('token', res.data.token);
                window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
                // history.push('/dashboard');
            })
            .catch(error => {
                errorHandler(dispatch, error.response.data.error || error.message, AUTH_ERROR);
            });
    };
}

export function logoutUser() {
    window.localStorage.removeItem('token');
    return { type: UNAUTH_USER };
}

export function fetchMessage() {
    return dispatch => {
        axios.get(CLIENT_ROOT_URL, {
            headers: { authorization: window.localStorage.getItem('token') },
        }).then(res => {
            console.log('fetchMessage response', res);
            dispatch({
                type: FETCH_MESSAGE,
                payload: res.data.message,
            });
        }).catch(err => {
            console.log('fetchMessage error', err.response.data.error || err.message);
        });
    };
}

function errorHandler(dispatch, error, type) {
    console.log('Error type: ', type);
    console.log(error);

    let errorMessage = error.response ? error.response.data : error;

    if (error.status === 401 || error.response.status === 401) {
        errorMessage = 'You are not authorized to do this.';
        // return dispatch(logoutUser(errorMessage));
    }

    dispatch({ type, payload: errorMessage });
}
