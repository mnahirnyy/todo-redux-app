import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FooterTemplate extends Component {
  render() {
    const d = new Date();
    const year = d.getFullYear();

    return (
      <footer className="footer">
        <div className="container">
            <p className="text-muted">© {year}, TuDooShe4ka. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);