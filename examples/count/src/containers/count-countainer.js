import React, {PropTypes} from 'react';

import {Container} from '../../../../lib';

import {
  countUp,
  countDown,
} from '../action-creators';

import CountButton from '../components/count-button';

export default class CountCountainer extends Container {
  render() {
    const state = this.getState();

    return (
      <section>
        <h1>Count: {state.total}</h1>
        <CountButton onCountButtonClick={countUp(this.dispatch)}>Count up +1</CountButton>
        <CountButton onCountButtonClick={countDown(this.dispatch)}>Count down -1</CountButton>
      </section>
    );
  }
}
