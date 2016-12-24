import test from 'ava';

import {
  createStore,
  getStore,
  clearStore,
  getState,
  dispatch,
} from './index';

test.beforeEach(t => {
  const store = getStore();

  t.is(store, null);
});

test.afterEach(t => {
  clearStore();
});

// createStore
test('createStore > call createStore with initial state.', t => {
  createStore({initialState: true});
  const store = getStore();

  t.not(store, null);
  t.deepEqual(store.getState(), {initialState: true})
});

test('createStore > call createStore twice.', t => {
  createStore({initialState: true});
  createStore({});
  const store = getStore();

  t.not(store, null);
  t.deepEqual(store.getState(), {initialState: true})
});

// getStore
test('getStore > call getStore before createStore.', t => {
  const store = getStore();

  t.is(store, null);
});

test('getStore > call createStore without initial state.', t => {
  createStore();
  const store = getStore();

  t.not(store, null);
  t.deepEqual(store.getState(), {})
});

// clearStore
test('clearStore > call clearStore', t => {
  t.is(getStore(), null);

  createStore();
  t.not(getStore(), null);

  clearStore();
  t.is(getStore(), null);
});

// getState
test('getState > call getState before createStore.', t => {
  t.is(null, getState());
});

test('getState > call getState after createStore.', t => {
  createStore({initialState: true});
  const store = getStore();

  t.not(store, null);
  t.not(store.getState(), getState());
  t.deepEqual(store.getState(), getState());
});

// dispatch
test('dispatch > call Store.dispatch before createStore', t => {
  t.throws(dispatch);
});

test('dispatch > call Store.dispatch (dispatch function is alias to Store.dispatch)', t => {
  createStore();
  const store = getStore();

  t.notThrows(dispatch);
});
