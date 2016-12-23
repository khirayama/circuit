import {Component, PropTypes} from 'react';
import {getStore} from '../';

export class Container extends Component {
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
}

Container.propTypes = {};