# Circuit

Circuit is a simple flux store and dispatcher for JavaScipt apps.  
Circuit provide `Store` with dispatch and subscription functions.  

If you use React, You can use [React Circuit](https://github.com/khirayama/react-circuit) component for Circuit's store.

## Table of Contents

- Circuit
  - createStore(initialState, reducer)
  - getStore
  - clearStore
  - getState
  - dispatch(action)
  - class: Store
    - store.getState
    - store.dispatch(action)
    - store.addChangeListener(callback)
    - store.removeChangeListener(callback)

## Documents

### createStore(initialState, reducer)

- `initialState` `<Object>` The initial state
- `reducer` `<Function>` The state and action handler function

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
    default:
      break;
  }
  // This `state` is set to `store.state`.
  return state;
}

createStore(initialstate, reducer);

```

### getStore

Get store from anywhere. If call this before `createStore`, return `null`.

```javascript

import {getStore} from 'circuit';

// If call getStore before createStore, return null.
const store = getStore();

```

### clearStore

Clear store from anywhere.

```javascript

import {clearStore} from 'circuit';

clearStore();

getStore(); // null

```

### getState

Alias for `store.getState`. If call this before `createStore`, return `null`.

```javascript

import {getState} from 'circuit';

const state = getState();

```

### dispatch(action)

Alias for `store.dispatch`. If call this before `createStore`, throw error.

```javascript

import {dispatch} from 'circuit';

dispatch({type: 'COUNT_UP'});

```

### Class: Store

#### store.getState

Get store's state. If call getState before createStore, return null. State is pure JavaScipt object.

```javascript

const store = getStore();

const state = store.getState();

```

#### store.dispatch(action)

- `action` `<Object>` The action object

Dispatch action object.

```javascript

const store = getStore();

store.dispatch({type: 'COUNT_UP'});

```

#### store.addChangeListener(listener)

- `listener` `<Function>` The callback function

Adds the `listener` function to the end of the listeners array for updating `store.state`.

```javascript

const store = getStore();

store.addChangeListener(componentUpdate);

```

#### store.removeChangeListener(listener)

- `listener` `<Function>` The callback function

Removes the specified `listener` from the listener array for updating `store.state`.

```javascript

const store = getStore();

store.removeChangeListener(componentUpdate);

```
