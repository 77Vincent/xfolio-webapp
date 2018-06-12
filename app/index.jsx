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
import to from 'await-to'
import base64 from 'base-64'

import store from './store'
import App from './base/App'
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER_ID, CONST_DATA_URLS } from './Consts'
import constDataHolder from './store/constDataHolder'
import { Request, transformUserInfo, cleanUpBeforeSignOut, dressUpAfterSignIn } from './utils'
import { agent } from './utils/request'

async function preRender() {
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID)
  if (localStorageToken !== null && userId !== null) {
    const tokenPayloadBase64 = localStorageToken.split('.')[1]
    const tokenPayloadContent = JSON.parse(base64.decode(tokenPayloadBase64))
    // 判断 token 是否过期
    if (tokenPayloadContent.exp < Date.now() / 1000) {
      cleanUpBeforeSignOut()
    } else {
      // 获取用户信息
      const [err, accountInfo] = await to(Request.getUserInfo(userId).then(res => res.text))
      const accountInfoJSON = JSON.parse(accountInfo)
      if (err !== null) {
        // 根据 id 获取不到用户信息，则清空数据
        cleanUpBeforeSignOut()
      } else {
        // 修改登录状态
        constDataHolder.apiToken = localStorageToken
        dressUpAfterSignIn(accountInfoJSON.id, constDataHolder.apiToken)
        store.dispatch.AccountInfo.updateAccountInfo(transformUserInfo(accountInfoJSON))
      }
    }
  } else {
    // 本地不存在 token 和 userId 的，判为未登录
    cleanUpBeforeSignOut()
  }

  // 初始化常量数据
  await Promise.all([
    agent.get(CONST_DATA_URLS.MAJORS).then((res) => {
      log('MAJORS res ', res)
      constDataHolder.majors = JSON.parse(res.text)
      constDataHolder.majorsNormalized = _.reduce(constDataHolder.majors, (r, v) => {
        r[v.id] = v
        return r
      }, {})
    }),
    agent.get(CONST_DATA_URLS.SCHOOLS).then((res) => {
      log('SCHOOLS res ', res)
      constDataHolder.schools = JSON.parse(res.text)
      constDataHolder.schoolsNormalized = _.reduce(constDataHolder.schools, (r, v) => {
        r[v.id] = v
        return r
      }, {})
    }),
    agent.get(CONST_DATA_URLS.PROVINCES).then((res) => {
      log('PROVINCES res ', res)
      constDataHolder.provinces = res.body
    }),
    agent.get(CONST_DATA_URLS.CITIES).then((res) => {
      log('CITIES res ', res)
      constDataHolder.cities = res.body
      constDataHolder.citiesNormalized = _.reduce(constDataHolder.cities, (r, v) => {
        r[v.code] = v
        return r
      }, {})
    }),
    agent.get(CONST_DATA_URLS.DEGREES).then((res) => {
      log('DEGREES res ', res)
      constDataHolder.degrees = res.body
    }),
    agent.get(CONST_DATA_URLS.COUNTRIES).then((res) => {
      log('COUNTRIES res ', res)
      constDataHolder.countries = res.body
      constDataHolder.countriesNormalized = _.reduce(constDataHolder.countries, (r, v) => {
        r[v.code] = v
        return r
      }, {})
    }),
  ])
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
