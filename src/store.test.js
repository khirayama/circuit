import test from 'ava';
import sinon from 'sinon';

import Store from './store';

test('Store > create instance without initial state.', t => {
  const store = new Store();

  t.deepEqual(store.getState(), {});
});

test('Store > create instance with initial state.', t => {
  const store = new Store({initialState: true});

  t.deepEqual(store.getState(), {initialState: true});
});

// internal
// - _subscribe
// - _dispatchChange
// - _emit
// - _addListener
// - _removeListener

// public
// - getState
// - dispatch(alias to _emit)
// - addChangeListener
// - removeChangeListener

test('Store > call getState', t => {
  const store = new Store();
  const state = store.getState();

  t.not(state, store._state);
  t.deepEqual(state, store._state);
});

// dispatch - (_emit) - (_subscribe) - (_dispatchChange) - getState
test('Store > update state to dispatch and subscribe', t => {
  const store = new Store(null, (state, action) => {
    switch (action.type) {
      case '__TEST_ACTION':
        state.callTestAction = true;
    }
    return state;
  });
  const spy = sinon.spy(store, '_dispatchChange');

  t.is(spy.callCount, 0);
  t.deepEqual(store.getState(), {});

  store.dispatch({type: '__TEST_ACTION'});

  t.is(spy.callCount, 1);
  t.deepEqual(store.getState(), {callTestAction: true});
});

test('Store > call addChangeListener', t => {
  const store = new Store();
  const callback = sinon.stub();

  store.addChangeListener(callback);

  store._dispatchChange();

  t.is(callback.callCount, 1);
});

test('Store > call removeChangeListener', t => {
  const store = new Store();
  const callback = sinon.stub();

  store.addChangeListener(callback);

  store._dispatchChange();

  t.is(callback.callCount, 1);

  store.removeChangeListener(callback);

  store._dispatchChange();

  t.is(callback.callCount, 1);
});
