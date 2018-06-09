
export const CONST_DATA_URLS = {
  MAJORS: 'https://www.xfolio.cn/api/majors/',
  SCHOOLS: 'https://www.xfolio.cn/api/schools/',
  DEGREES: 'https://www.xfolio.cn/resources/degrees.json',
  COUNTRIES: 'https://www.xfolio.cn/resources/locale/countries.json',
  PROVINCES: 'https://www.xfolio.cn/resources/locale/CN/provinces.json',
  CITIES: 'https://www.xfolio.cn/resources/locale/CN/cities.json',
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

export const PRICE_ORDER_OPTIONS = {
  LOW_TO_HIGH: 1,
  HIGH_TO_LOW: 2,
}
