// import * as types from './types';
import axios from 'axios';
import cookie from 'react-cookie';
// import { logoutUser } from './auth';

export const API_URL = 'http://localhost:3000/api';
export const CLIENT_ROOT_URL = 'http://localhost:3000';

// export function errorHandler (dispatch, error, type) {
//   console.log('Error type: ', type);
//   console.log(error);

//   let errorMessage = error.response ? error.response.data : error;

//   if (error.status === 401 || error.response.status === 401) {
//     errorMessage = 'You are not authorized to do this.';
//     return dispatch(logoutUser(errorMessage));
//   }

//   dispatch({ type, payload: errorMessage });
// }

export function fetchUser(uid) {
  return function (dispatch) {
    axios.get(`${API_URL}/user/&{uid}`, {
      headers: { Authorization: cookie.load('token') },
    })
    .then(response => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.user,
      });
    })
    .catch(response => dispatch(errorHadler(response.data.error)));
  }
}
// export function getTodos() {
//   return function(dispatch) {
//     // console.log('testing it out');
//     console.log(dispatch)
//     axios.get('/api/todos')
//       .then(({ data: { data } }) => {
//         dispatch({
//           type: types.GET_TODOS,
//           payload: data
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// export function getTodo({ id: todoId }) {
//   return function(dispatch) {
//     axios.get(`/api/todos/${todoId}`)
//       .then(({ data: { data } }) => {
//         dispatch({
//           type: types.GET_TODO,
//           payload: data
//         });
//       })
//       .catch(err => {
//         console.error(err);
//         // alert('there was a problem with your request');
//       });
//   }
// }

// export function createTodo(todo) {
//   return function(dispatch) {
//     axios.post('/api/todos', todo)
//       .then(({ data }) => {
//         console.log(0);
//         dispatch({
//           type: types.CREATE_TODO,
//           payload: true
//         });
//       })
//       .catch(err => {
//         console.log(1);
//         dispatch({
//           type: types.CREATE_TODO,
//           payload: false
//         });
//         throw err;
//       });
//   }
// }

// export function editTodo(todo) {
//   return function(dispatch) {
//     axios.put(`/api/todos/${todo.id}`, todo)
//       .then(({ data }) => {
//         console.log('from actions ', data);
//         dispatch({
//           type: types.EDIT_TODO,
//           payload: true
//         })
//       })
//       .catch(err => {
//         console.error(err);
//         dispatch({
//           type: types.EDIT_TODO,
//           payload: false
//         });
//       });
//   }
// }

// export function deleteTodo({ id: todoId }) {
//   return function(dispatch) {
//     axios.delete(`/api/todos/${todoId}`)
//       .then(({ data }) => {
//         console.log(data);
//         dispatch({
//           type: types.DELETE_TODO,
//           payload: true
//         });
//       })
//       .catch(err => {
//         console.error(err);
//         dispatch({
//           type: types.DELETE_TODO,
//           payload: false
//         });
//       });
//   }
// }