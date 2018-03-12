# React-Redux test embeddable package application.
####This is an react application with the whole bound react-redux infrastructure inside - actions, reducers, selectors and redux store.

## Running

### In scope of React application

After installing via ```npm install``` you need to:

```import TestApp from 'anton-vlasik-react-test-component';```

This component is created to demonstrate an ability of embedding react-redux application into another react application 
(even without redux). It simply demonstrates interacting with redux store via simple counter. Also there is an ability 
to interact with react's component local state. Just click 'Enlarge' and 'Reduce' buttons to see how svg icon behaves.

Additionally you can pass a custom properties to this component 

```<TestApp svgSizeFactor={10} svgColor='#00ff00'>```

...and it will be passed down to a root component and set as a start svg size factor and/or svg color.

### In scope of any application

You can use minified script (importing styles is also on you). It is located inside "dist" folder in "umd" subfolder
Create a ```<div id="your-id">``` where test application will live. 
Subscribe to "DomContentLoaded" event and call ```ReactReduxTest.init(options)``` where options is an object with
obligatory ```id``` property equal to your wrapper div's id. You can also pass additional params.

Examaple: 
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <script src="node_modules/anton-vlasik-react-test-component/umd/react-redux-test-component.js"></script>
</head>
<body>
<div id="root"></div>
<script>
  document.addEventListener('DOMContentLoaded', function(){ 
      ReactReduxTest.init({
        id: 'your-id',
        svgColor: '#00ff00',
        svgSizeFactor: 25
      })
  })
</script>
</body>
</html>
```

