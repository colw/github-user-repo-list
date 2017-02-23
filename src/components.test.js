import React from 'react';
import ReactDOM from 'react-dom';
import {FetchComponent, LinkExt} from './components';

beforeEach(() => {
  console.debug = () => {};
});

it('FetchComponent.handleJSON returns correct JSON', () => {
  const c = new FetchComponent();

  const data = {key: "value"};
  const response = new Response(JSON.stringify(data));

  return c.handleJSON(response)
    .then(json => expect(json).toEqual(data));  
});

it('FetchComponent.printData returns given data', () => {
  const c = new FetchComponent();
  const data = {key: "value"};
  expect(c.printData(data)).toEqual(data);
});

it('FetchComponent.checkStatus returns response if ok', () => {
  const c = new FetchComponent();
  var response = new Response(new Blob(), { "status" : 200 });
  expect(c.checkStatus(response)).toEqual(response);
});

it('renders LinkExt without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LinkExt />, div);
});
