import React, {Component} from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import Layout from './components/Layout';
import './components/stylesheets/App.css';

class App extends Component {
  render () {
    return (
      <div >
        <Router >
          <Layout/>
        </Router>
      </div>
    );
  }
}

export default App;
