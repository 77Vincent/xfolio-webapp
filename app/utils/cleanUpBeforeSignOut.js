import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER_ID } from '../Consts'
import store from '../store'

export default function cleanUpBeforeSignOut() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE_USER_ID)
  store.dispatch.AppStatus.updateUserSignInStatus(false)
  store.dispatch.AppStatus.updateTeacherFilterInitStatus(false)
}
