import React, {Component, PropTypes} from 'react';

import {getStore} from '../../../../lib';

import {
  countUp,
  countDown,
} from '../action-creators';

import CountButton from '../components/count-button';

export default class CountContainer extends Component {
  constructor() {
    super();

    const store = getStore();

    this.state = store.getState();

    this.dispatch = store.dispatch.bind(store);
    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    const store = getStore();

    store.addChangeListener(this.updateState);
  }

  componentWillUnmount() {
    const store = getStore();

    store.removeChangeListener(this.updateState);
  }

  _updateState() {
    const store = getStore();

    this.setState(store.getState());
  }
  render() {
    return (
      <section>
        <h1>Count: {this.state.total}</h1>
        <CountButton onCountButtonClick={countUp(this.dispatch)}>Count up +1</CountButton>
        <CountButton onCountButtonClick={countDown(this.dispatch)}>Count down -1</CountButton>
      </section>
    );
  }
}
