const EVENT_CHANGE = '__CHANGE_STORE';
const ACTION_DISPATCH = '__ACTION_DISPATCH';

export class Store {
  constructor(state, reducer) {
    this.state = state || {};

    this._reducer = reducer || (state => {
      return state;
    });
    this._listeners = {};

    this._subscribe();
  }

  dispatch(action) {
    this.emit(ACTION_DISPATCH, action);
  }

  _subscribe() {
    this.addListener(ACTION_DISPATCH, action => {
      this.state = this._reducer(this.state, action);
      if (typeof window === 'object') {
        console.log('%cAction:', 'color: #b71c1c; font-weight: bold;', action);
        console.log('%cState:', 'color: #0d47a1; font-weight: bold;', this.state);
      }
      this.dispatchChange();
    });
  }

  dispatchChange() {
    this.emit(EVENT_CHANGE);
  }

  addChangeListener(listener) {
    this.addListener(EVENT_CHANGE, listener);
  }

  removeChangeListener(listener) {
    this.removeListener(EVENT_CHANGE, listener);
  }

  getState() {
    return Object.assign({}, this.state);
  }

  emit(type, payload) {
    if (!this._listeners[type]) {
      return this;
    }
    this._listeners[type].forEach(_listener => {
      _listener.listener.apply(this, [payload]);
    });
    return this;
  }

  addListener(type, listener) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push({listener});
    return this;
  }

  removeListener(type, listener) {
    if (!this._listeners[type]) {
      return this;
    }
    if (!this._listeners[type].length) {
      return this;
    }
    if (!listener) {
      delete this._listeners[type];
      return this;
    }
    this._listeners[type] = this._listeners[type].filter(
      _listener => !(_listener.listener === listener)
    );
    return this;
  }
}

let _store = null;

export function createStore(state, reducer) {
  if (_store === null) {
    _store = new Store(state, reducer);
  }
}

export function getStore() {
  return _store;
}

export function getState() {
  if (_store !== null) {
    return _store.getState();
  }
  return null;
}

export function dispatch(action) {
  return _store.dispatch(action);
}
