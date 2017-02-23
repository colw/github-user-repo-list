import React, { Component } from 'react';

export class FetchComponent extends Component {
  checkStatus = (res) => {
      if (!res.ok) {
          throw Error(res.status);
      }
      return res;
  }

  handleJSON = (res) => res.json()

  errorMessage = (error) => {
    const status = error.response ? error.response.status : 500
    if (status === 404) {
      console.log("404");
    } else {
      console.log("other error", error);
    }
  }

  printData = (data) => {
    console.debug(data);
    return data;
  }
}

export const LinkExt = (props) => (
  <a {...props} target="_blank" rel="noopener"/>
)
