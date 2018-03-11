# React-Redux test embeddable package application.
####This is an react application with the whole bound react-redux infrastructure inside - actions, reducers, selectors and redux store.

## Running

After installing via ```npm install``` you need to:

```import TestApp from 'anton-vlasik-react-test-component';```

also if you want to use default styles you will have to import them in your entry point

```import 'anton-vlasik-react-test-component/dist/styles.css'```

This component is created to demonstrate an ability of embedding react-redux application into another react application 
(even without redux). It simply demonstrates interacting with redux store via simple counter. Also there is an ability 
to interact with react's component local state. Just click 'Enlarge' and 'Reduce' buttons to see how svg icon behaves.

Additionally you can pass a custom properties to this component 

```<TestApp svgSizeFactor={10} svgColor='#00ff00'>```

...and it will be passed down to a root component and set as a start svg size factor and/or svg color.
