/**
 * Xfolio entry file
 */

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

import store from './store'
import App from './base/App'
import { LOCAL_STORAGE_TOKEN } from './Consts'
import apiTokenHolder from './store/apiTokenHolder'

const preRender = new Promise((resolve) => {
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  if (localStorageToken !== undefined) {
    // TODO 做 token 有效性校验

    apiTokenHolder.token = localStorageToken
    store.dispatch.AppStatus.updateUserSignInStatus(true)
    resolve()
  }
})

preRender.then(() => {
  ReactDOM.render(
    <Router>
      <LocaleProvider locale={zhCN}>
        <Provider store={store}>
          <App />
        </Provider>
      </LocaleProvider>
    </Router>,
    document.getElementById('root'),
    () => {
      // remove initial spinning loader after react dom is rendered
      document.getElementById('root').classList.remove('App-spinner')
    },
  )
})
