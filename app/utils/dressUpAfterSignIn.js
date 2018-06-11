import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER_ID } from '../Consts'
import store from '../store'

export default function dressUpAfterSignIn(uid, token) {
  localStorage.setItem(LOCAL_STORAGE_USER_ID, uid)
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
  store.dispatch.AppStatus.updateUserSignInStatus(true)
  store.dispatch.AppStatus.updateTeacherFilterInitStatus(true)
}
