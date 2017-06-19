if (process.env.NODE_ENV !== 'production') {
  require('./templates/index.pug')
}

import React from 'react'
import ReactDOM from 'react-dom'

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader'

// See more
// https://github.com/facebook/react/issues/436
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'

injectTapEventPlugin()

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}
