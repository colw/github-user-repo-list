import React from 'react';
import ReactDOM from 'react-dom';
import RepoList from './RepoList';

beforeEach(() => {
  console.debug = () => {};
});

it('renders without crashing', () => {
  const div = document.createElement('div');

  const fauxProps = {
  	token: '',
  	match: {
  		params: {
  			userId: ''
  		}
  	},
		push: () => {}
  }

  ReactDOM.render(<RepoList {...fauxProps} />, div);
});

