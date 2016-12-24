const EVENT_CHANGE = '__CHANGE_STORE';
const ACTION_DISPATCH = '__ACTION_DISPATCH';

export default class Store {
  constructor(state, reducer) {
    this._state = state || {};

    this._reducer = reducer || (state => {
      return state;
    });
    this._listeners = {};

    this._subscribe();
  }

  // internal
  _emit(type, payload) {
    if (!this._listeners[type]) {
      return this;
    }
    this._listeners[type].forEach(_listener => {
      _listener.listener.apply(this, [payload]);
    });
    return this;
  }

  _addListener(type, listener) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push({listener});
    return this;
  }

  _removeListener(type, listener) {
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

  _subscribe() {
    this._addListener(ACTION_DISPATCH, action => {
      this._state = this._reducer(Object.assign({}, this._state), action);
      if (typeof window === 'object') {
        console.log('%cAction:', 'color: #b71c1c; font-weight: bold;', action);
        console.log('%cState:', 'color: #0d47a1; font-weight: bold;', this._state);
      }
      this._dispatchChange();
    });
  }

  _dispatchChange() {
    this._emit(EVENT_CHANGE, this);
  }

  // public
  getState() {
    return Object.assign({}, this._state);
  }

  dispatch(action) {
    this._emit(ACTION_DISPATCH, action);
  }

  addChangeListener(listener) {
    this._addListener(EVENT_CHANGE, listener);
  }

  removeChangeListener(listener) {
    this._removeListener(EVENT_CHANGE, listener);
  }
}
