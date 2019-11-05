import React, { Component } from 'react';
import AppRouter from './core/containers/AppRouter';

class App extends Component {
  render() {
    return (
      <div className="container">
        <AppRouter/>
      </div>
    );
  }
}
export default App;