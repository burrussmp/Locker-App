# Locker Application

## Find the IP Address of the Machine

```bash
ipconfig
```

or if that fails

```bash
ifconfig
```

## Useful Links

**core components**: https://reactnative.dev/docs/components-and-apis

# Understanding the Code

The code uses react navigation to control flow between screens. Screens are made up of containers which are made of components. To pass information (props) to a screen, use react context.

Each Stack.Screen component has a name prop and component prop which specifies the component to render for the route. You can also specify options in the Stack.Screen to pass options to each component.

Change the StatusBar based on the screen. Should contrast the background.

Understand the redux pattern for react native.

## Understanding Redux and React-Redux

Highly recommend this for a brief on Redux: https://redux.js.org/tutorials/essentials/part-1-overview-concepts

A **reducer** is a pure function that takes the previous state and an action and returns a new state. In other words, you can dispatch an action to the reducer and the reducer will manipulate the state and return a new state. The state's should be entirely dependent on the previous state and current action. Wherever you want the reducers, just make sure to add `import { Provider } from 'react-redux';` to the top of the code. This should be in the App.js.

A **store** is created from a reducer `createStore(reducer)`. It is the actual object that holds the data. In other words, the action is an object, the reducer reacts to the object and returns a new state, and the store is in charge of maintaining that state.

To add state to a screen, import `import { connect } from 'react-redux';` and add the function `mapStateToProps` like so

```javascript
const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};
```

