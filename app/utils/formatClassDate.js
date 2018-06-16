import moment from 'moment'

/**
 *
 * @param ts 开始时间戳
 * @param length 小时数
 * @returns {string}
 */
export default function formatClassDate(ts, length) {
  let date = new Date(ts)
  const dateInfo = moment(date).format('YYYY/MM/DD')
  const fromTimeInfo = moment(date).format('a hh:mm')
  date = new Date(ts + (length * 3600 * 1000))
  const targetTimeInfo = moment(date).format('hh:mm')
  return `${dateInfo}\n${fromTimeInfo}-${targetTimeInfo}`
}
