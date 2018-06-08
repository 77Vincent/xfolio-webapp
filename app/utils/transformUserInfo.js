
export default function transformUserInfo(userInfo) {
  // 做格式转换，磨平 api 和 store 的差别
  userInfo.roleId = userInfo.role_id
  delete userInfo.role_id

  userInfo.gender = userInfo.gender ? 1 : 0

  return userInfo
}
