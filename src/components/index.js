import React, { Component } from 'react';
import './styles.scss';
import GitUsers from './git-users';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <GitUsers />
      </div>
    )
  }
}

export default App;
