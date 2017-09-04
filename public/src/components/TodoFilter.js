import React, { Component } from 'react';

class TodoFilter extends Component {
  render() {
    return (
      <footer className="footer">
         <span className="todo-count">
           <strong>This many</strong> items left
         </span>
         <ul className="filters">
           <li><a>filter types go here</a></li>
         </ul>
         <button className="clear-completed">Clear Completed</button>
      </footer>
    );
  }
}

export default TodoFilter;