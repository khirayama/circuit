import {EventEmitter} from 'events';
import {Component} from 'react';

const EVENT_CHANGE = '__CHANGE_STORE';
const ACTION_DISPATCH = '__ACTION_DISPATCH';

export class Store extends EventEmitter {
  constructor(state, reducer) {
    super();

    this.state = state || {};
    this._reducer = reducer || (state => {
      return state;
    });

    this.subscribe();
  }
  dispatch(action) {
    this.emit(ACTION_DISPATCH, action);
  }
  subscribe() {
    this.on(ACTION_DISPATCH, action => {
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

export class Container extends Component {
  constructor() {
    super();

    this.forceUpdate = this.forceUpdate.bind(this);
  }
  getState() {
    const store = getStore();
    return store.getState();
  }
  dispatch(action) {
    const store = getStore();
    store.dispatch(action);
  }
  componentDidMount() {
    const store = getStore();
    store.addChangeListener(this.forceUpdate);
  }
  componentWillUnmount() {
    const store = getStore();
    store.removeChangeListener(this.forceUpdate);
  }
}

Container.propTypes = {};
