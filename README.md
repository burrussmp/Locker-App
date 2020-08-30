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