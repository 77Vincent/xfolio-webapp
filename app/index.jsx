/**
 * Xfolio entry file
 */

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

import store from './store'
import App from './base/App'

ReactDOM.render(
  <HashRouter>
    <LocaleProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocaleProvider>
  </HashRouter>,
  document.getElementById('root'),
  () => {
    // remove initial spinning loader after react dom is rendered
    document.getElementById('root').classList.remove('App-spinner')
  },
)
