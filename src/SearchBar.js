import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  onChange = (e) => {
    this.setState({text: e.target.value}, this.pushView)
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.pushView();
    
  }
  pushView() {
    const path = this.state.text ? `/user/${this.state.text}` : '/';
    this.props.push(path, {user404: this.state.text});
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Username: </label>
          <input value={this.state.text} onChange={this.onChange} />
        </form>
      </div>
    );
  }
}
