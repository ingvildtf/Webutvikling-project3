import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
//import App from './App'
import MainPage from './MainPage'
import * as serviceWorker from './serviceWorker'
import store from './store'
import './index.css'

/* const store = createStore(reducer)
 */

//Provider connects our global state in the store to our application, so our whole application have acces to the store 
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*  <App /> */}
      <MainPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
