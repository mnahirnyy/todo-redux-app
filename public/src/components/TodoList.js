import React, { Component } from 'react';
import TodoFilter from './TodoFilter';

class TodoList extends Component {
  render() {
    const { todos } = this.props;
    const todosHTML = todos.map((todo, i) => {
      return (
        <li key={i} className="todo">
          <div className="view">
            <input
              type="checkbox"
              className="toggle" />
            <label>{todo.task}</label>
            <button className="destroy"></button>
          </div>
        </li>
      );
    });
    const todoFooter = !todos.length ? null : <TodoFilter />;
    return (
      <section className="main">
        <ul className="todo-list">
          {todosHTML}
        </ul>
        {todoFooter}
      </section>
    );
  }
}

export default TodoList;