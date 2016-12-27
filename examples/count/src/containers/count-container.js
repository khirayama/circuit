import React, {PropTypes} from 'react';

import {Container} from '../../../../lib/react';

import {
  countUp,
  countDown,
} from '../action-creators';

import CountButton from '../components/count-button';

export default class CountContainer extends Container {
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
