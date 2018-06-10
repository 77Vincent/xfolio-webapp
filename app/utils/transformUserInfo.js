
export default function transformUserInfo(userInfo) {
  // 做格式转换，磨平 api 和 store 的差别
  userInfo.gender = userInfo.gender ? 1 : 0
  userInfo.avatar_id = userInfo.avatar_id || parseInt(userInfo.avatar_url.match(/.*\/(\d+)$/)[1], 10)
  return userInfo
}
