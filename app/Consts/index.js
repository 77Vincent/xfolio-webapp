
export const USER_ROLE = {
  ADMIN: 1,
  TEACHER: 2,
  STUDENT: 3,
}

export const LOCAL_STORAGE_TOKEN = 'LOCAL_STORAGE_TOKEN'
export const LOCAL_STORAGE_USER_ID = 'LOCAL_STORAGE_USER_ID'

export const SEND_CAPTCHA_COUNT_DOWN = 60

export const COURSE_PLACE_OPTIONS = {
  both: {
    value: 'both',
    name: '不限',
  },
  online: {
    value: 'online',
    name: '线上',
  },
  offline: {
    value: 'offline',
    name: '线下',
  },
}

export const GENDER_OPTIONS = [
  {
    value: 0,
    name: '女',
  },
  {
    value: 1,
    name: '男',
  },
]
export const GENDER_OPTIONS_NORMALIZED = {
  0: GENDER_OPTIONS[0],
  1: GENDER_OPTIONS[1],
}
