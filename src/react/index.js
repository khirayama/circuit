import {Component} from 'react';

export class Container extends Component {
  constructor() {
    super();

    this.updateState = this._updateState.bind(this);
  }
  _updateState() {
    const store = getStore();
    this.setState(store.getState());
  }
  dispatch(action) {
    const store = getStore();
    store.dispatch(action);
  }
  componentDidMount() {
    const store = getStore();
    store.addChangeListener(this.updateState);
  }
  componentWillUnmount() {
    const store = getStore();
    store.removeChangeListener(this.updateState);
  }
}

Container.propTypes = {};
