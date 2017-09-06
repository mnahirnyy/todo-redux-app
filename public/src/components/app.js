import React, { Component } from 'react';
import HeaderTemplate from './templates/header';
import FooterTemplate from './templates/footer';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="Your Site" />

        <div className="container">
          {this.props.children}
        </div>

        <FooterTemplate />
      </div>
    );
  }
}

export default App;