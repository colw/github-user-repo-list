import React from 'react';
import { debounce } from 'lodash'
import { FetchComponent, LinkExt } from './components'

export default class RepoList extends FetchComponent {
  constructor(props) {
    super(props);
    this.API_ENDPOINT = 'https://api.github.com/users';
    const token = this.props.token;
    this.state = {
      list: [],
    }

    // Use Token if present. Otherwise use our request quota.
    if (token !== null && token.length > 0) {
      this.state.headers = {"Authorization": "token " + token};
    }
 
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== this.props.token) {
      const newToken = nextProps.token;
      this.setState({
        headers: {"Authorization": newToken !== null && newToken.length > 0 ? "token " + newToken : null}
      });
    }
  }

  pushErrorView(message) {
    console.log('Go to error:', message);
    this.props.push('/error', message);
  }

  handleErrors = (error) => {
    const status = parseInt(error.message, 10) || 500;
    if (status === 404) {
      this.pushErrorView(`Could not find user '${this.props.match.params.userId}'`);
    } else if (status === 401 || status === 403) {
      this.pushErrorView("Not authorized, or rate limit exceeded");
    } else {
      this.pushErrorView("Error");
    }
  }

  fetchData = debounce(() => {
    const path = `${this.API_ENDPOINT}/${this.props.match.params.userId}/repos`;
    const opts = { headers: this.state.headers }
    console.debug('opts', opts);
    fetch(path, opts)
      .then(this.checkStatus)
      .then(this.handleJSON)
      .then((data) => this.setState({list: data}))
      .catch(this.handleErrors);
  }, 500)
  
  render () {

    // Avatar, just in case at a later date.
    // <td><div><img className="u-max-full-width" src={x.owner.avatar_url} /></div></td>

    const repos = this.state.list.map((x,y) => (
      <tr key={x.id}>
        <td>
          <LinkExt href={x.html_url} >{x.name}</LinkExt>
        </td>
        <td>
          {x.stargazers_count}
        </td>
      </tr>
    ))

    return (
      <div className="list-container u-full-width">
        <table className="list-container u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody>
            {repos || (<tr><td>None</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
