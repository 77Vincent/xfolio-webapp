
export const CONST_DATA_URLS = {
  // REST API
  MAJORS: '/api/majors/',
  SCHOOLS: '/api/schools/',
  COUNTRIES: '/api/countries',
  FOLLOWER_FOLLOWING: '/api/followers_followings/',
  // Static resources
  DEGREES: '/resources/degrees.json',
  PROVINCES: '/resources/locale/CN/provinces.json',
  CITIES: '/resources/locale/CN/cities.json',
}

export const USER_ROLE = {
  ADMIN: 0,
  TEACHER: 1,
  STUDENT: 2,
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

export const GENDER_OPTIONS = [{
  value: [0, 1],
  name: '不限',
}, {
  value: 0,
  name: '女',
}, {
  value: 1,
  name: '男',
}]

export const GENDER_OPTIONS_NORMALIZED = {
  0: GENDER_OPTIONS[0],
  1: GENDER_OPTIONS[1],
}

export const PRICE_ORDER_OPTIONS = {
  LOW_TO_HIGH: 'ASC',
  HIGH_TO_LOW: 'DESC',
}
