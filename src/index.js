import React from 'react'
import ReactDOM from 'react-dom'

// bootstrap
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// scss
import './styles/index.scss'

// material design lite
import '../node_modules/material-design-lite/dist/material.indigo-blue.min.css'
import '../node_modules/material-design-lite/dist/material.js'

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blue500, blue700, blue100 } from 'material-ui/styles/colors'
injectTapEventPlugin()
const muiTheme = getMuiTheme(
  {
    palette: {
      primary1Color: blue500,
      primary2Color: blue700,
      primary3Color: blue100,
      primary4Color: '#3f51b5'
    },
  },
  {
    avatar: {
      borderColor: null
    }
  }
)

//React Router
import routes from './routes'
import { Router, browserHistory } from 'react-router'

//create store
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import promise from 'redux-promise'
// import createLogger from 'redux-logger'
import rootReducer from './reducers/rootReducer'
// const logger = createLogger()
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

//auth
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './actions/authActions'
import jwt from 'jsonwebtoken'
if (localStorage.token) {
  setAuthorizationToken(localStorage.token)
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)))
}


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory} routes={routes}/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
