import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from '../../../lib';
import reducer from './reducers';

import CountCountainer from './containers/count-countainer';

window.addEventListener('DOMContentLoaded', () => {
  const initialState = {total: 0};
  createStore(initialState, reducer);

  ReactDOM.render(<CountCountainer />, document.querySelector('.count'));
});
