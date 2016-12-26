# <img src="logo/logo-title-dark.png" height="60"/>

Circuit is a simple flux store and dispatcher for JavaScipt apps.  
Circuit provide `Store` with dispatch and subscription functions.  
If you use React, You can use `Container` component for Circuit's store.

## Getting Started

This has not been published to npm yet.
Add this package to `package.json` as `khirayama/circuit`.

## API

This has 5 functions, store and container for react.  
Ref: [Documents](documents.md)

### Functions

This has 5 functions.

- createStore
- getStore
- clearStore
- getState
- dispatch

### Store

Store instance has 4 publich methods.

- store.getState
- store.dispatch
- store.addChangeListener
- store.removeChangeListener

### Container

Container provide state and dispatch for react.
It is a reference implementation only. It is not HOC.

## Documents

[Documents](documents.md)

## Examples

Ref: [examples](examples)

```javascript

import {createStore} from 'circuit';

const initialState = {
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'COUNT_UP':
      state.total += 1;
      break;
    case 'COUNT_DOWN':
      state.total -= 1;
      break;
  }
  return state;
}

const store = createStore(initialstate, reducer);

store.getState();
// same) getState();
// result) {total: 0}

store.dispatch({type: 'COUNT_UP'});
// same) dispatch({type: 'COUNT_UP'})

store.getState();
// same) getState();
// result) {total: 1}

store.dispatch({type: 'COUNT_DOWN'});
// same) dispatch({type: 'COUNT_DOWN'})

store.getState();
// same) getState();
// result) {total: 0}

```

## [Recommend] Rules

- Action creator can dispatch only one action.
- Action should have `type` property.
- Reducer should return new state.
- Readable state by `getState` anywhere.
