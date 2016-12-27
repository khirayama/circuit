import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import {jsdom} from 'jsdom';

import {createStore, clearStore} from '../index';
import {Container} from './index';

class TestContainer extends Container {
  render() {
    return <div className="test-container">Test Container</div>;
  }
}

test.beforeEach(t => {
  global.document = jsdom('');
  global.window = global.document.defaultView;
  global.navigator = {userAgent: 'node.js'};

  t.context.keys = [];
  Object.keys(global.document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
      t.context.keys.push(property);
      global[property] = global.document.defaultView[property];
    }
  });
});

test.afterEach(t => {
  delete global.document;
  delete global.window;
  delete global.navigator;

  t.context.keys.forEach(property => {
    delete global[property];
  });
  clearStore();
});

test('Continaer > throws error before call createStore', t => {
  t.throws(() => {
    shallow(<TestContainer/>);
  });
});

test('Continaer > works to render in Container', t => {
  createStore();

  const wrapper = shallow(<TestContainer/>);

  t.is(wrapper.find('.test-container').length, 1);
});

test('Continaer > works to render in Container', t => {
  createStore({total: 0});
  const wrapper = mount(<TestContainer/>);

  t.is(wrapper.find('.test-container').length, 1);
  t.is(wrapper.state().total, 0);
});

test('Continaer > works to upadte state', t => {
  const store = createStore({total: 0}, (state, action) => {
    if (action.type === 'COUNT_UP') {
      state.total += 1;
    }
    return state;
  });
  const wrapper = mount(<TestContainer/>);

  t.is(wrapper.find('.test-container').length, 1);
  t.is(wrapper.state().total, 0);

  store.dispatch({type: 'COUNT_UP'});

  t.is(wrapper.state().total, 1);
});
