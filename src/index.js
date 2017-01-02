import Store from './store';

let _store = null;

export function createStore(state, reducer, options) {
  if (_store === null) {
    _store = new Store(state, reducer, options);
  }
  return _store;
}

export function getStore() {
  return _store;
}

export function clearStore() {
  _store = null;
}

export function getState() {
  if (_store !== null) {
    return _store.getState();
  }
  return null;
}

export function dispatch(action) {
  if (_store === null) {
    throw new Error('Call createStore before to call this function.');
  } else {
    _store.dispatch(action);
  }
}

export {Store};
