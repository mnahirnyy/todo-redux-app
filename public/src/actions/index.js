import * as types from './types';
import axios from 'axios';

export function getTodos() {
  return function(dispatch) {
    // console.log('testing it out');
    console.log(dispatch)
    axios.get('/api/todos')
      .then(({ data: { data } }) => {
        dispatch({
          type: types.GET_TODOS,
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export function getTodo({ id: todoId }) {
  return function(dispatch) {
    axios.get(`/api/todos/${todoId}`)
      .then(({ data: { data } }) => {
        dispatch({
          type: types.GET_TODO,
          payload: data
        });
      })
      .catch(err => {
        console.error(err);
        // alert('there was a problem with your request');
      });
  }
}

export function createTodo(todo) {
  return function(dispatch) {
    axios.post('/api/todos', todo)
      .then(({ data }) => {
        console.log(0);
        dispatch({
          type: types.CREATE_TODO,
          payload: true
        });
      })
      .catch(err => {
        console.log(1);
        dispatch({
          type: types.CREATE_TODO,
          payload: false
        });
        throw err;
      });
  }
}

export function editTodo(todo) {
  return function(dispatch) {
    axios.put(`/api/todos/${todo.id}`, todo)
      .then(({ data }) => {
        console.log('from actions ', data);
        dispatch({
          type: types.EDIT_TODO,
          payload: true
        })
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: types.EDIT_TODO,
          payload: false
        });
      });
  }
}

export function deleteTodo({ id: todoId }) {
  return function(dispatch) {
    axios.delete(`/api/todos/${todoId}`)
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: types.DELETE_TODO,
          payload: true
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: types.DELETE_TODO,
          payload: false
        });
      });
  }
}