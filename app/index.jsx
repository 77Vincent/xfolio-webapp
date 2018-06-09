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
import _ from 'lodash'

import store from './store'
import App from './base/App'
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER_ID, CONST_DATA_URLS } from './Consts'
import constDataHolder from './store/constDataHolder'
import { Request, transformUserInfo } from './utils'
import { agent } from './utils/request'


async function preRender() {
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID)
  if (localStorageToken !== null) {
    // TODO 做 token 有效性校验

    // 修改登录状态
    constDataHolder.apiToken = localStorageToken
    store.dispatch.AppStatus.updateUserSignInStatus(true)
    store.dispatch.AppStatus.updateTeacherFilterInitStatus(true)
  }
  if (userId !== null) {
    // 初始化用户信息
    const accountInfo = await Request.getUserInfo(userId).then(res => res.text)
    store.dispatch.AccountInfo.updateAccountInfo(transformUserInfo(JSON.parse(accountInfo)))
  }

  // 初始化常量数据
  constDataHolder.majors = await agent.get(CONST_DATA_URLS.MAJORS).then(res => res.text)
  constDataHolder.majors = JSON.parse(constDataHolder.majors)
  constDataHolder.majorsNormalized = _.reduce(constDataHolder.majors, (r, v) => {
    r[v.id] = v
    return r
  }, {})

  constDataHolder.degrees = await agent.get(CONST_DATA_URLS.DEGREES).then(res => res.text)
  constDataHolder.degrees = JSON.parse(constDataHolder.degrees)

  constDataHolder.countries = await agent.get(CONST_DATA_URLS.COUNTRIES).then(res => res.body)
  constDataHolder.countriesNormalized = _.reduce(constDataHolder.countries, (r, v) => {
    r[v.code] = v
    return r
  }, {})

  constDataHolder.provinces = await agent.get(CONST_DATA_URLS.PROVINCES).then(res => res.body)
  constDataHolder.cities = await agent.get(CONST_DATA_URLS.CITIES).then(res => res.body)
}

preRender().then(() => {
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
