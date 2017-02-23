import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RepoList from './RepoList';
import SearchBar from './SearchBar';

import './App.css';

const NoMatch = ({location}) => (
  <div>
    <h3>{location.state}</h3>
  </div>
)

const TokenInput = (props) => (
  <div>
    <label>Token: </label>
    <input {...props} />
  </div>
)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    }
  }

  onTokenChange = (e) => {
    this.setState({token: e.target.value.trim()})
  }

  renderRepoList = (props) => (
    <RepoList token={this.state.token} {...props} />
  )

  render() {
    return (
      <Router>
        <div className="App">
          <TokenInput value={this.state.token} onChange={this.onTokenChange} />
          <Route path={'/'} exact={false} component={SearchBar} />
          <Route path={'/user/:userId'} render={this.renderRepoList} />
          <Route path={'/error'} component={NoMatch} />
        </div>
      </Router>
    );
  }
}

export default App;
