import React, { Component } from 'react';
import TodoList from './TodoList';

export default class TodoApp extends Component {
  render() {
    const todos = [ { task: 'just a few todos' }, { task: 'to hold us over' }, { task: 'then the real thing' } ];
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input type="text" className="new-todo" placeholder="What needs to be done?" autoFocus autoComplete />
        </header>
        <TodoList todos={todos} />
      </section>
    );
  }
}