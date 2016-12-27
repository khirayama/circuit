import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from '../../../lib';
import reducer from './reducers';

import CountContainer from './containers/count-container';

window.addEventListener('DOMContentLoaded', () => {
  const initialState = {total: 0};
  createStore(initialState, reducer);

  ReactDOM.render(<CountContainer />, document.querySelector('.count'));
});
