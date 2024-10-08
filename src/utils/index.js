/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return 'Just now'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + 'Minutes ago'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + 'Hours ago'
  } else if (diff < 3600 * 24 * 2) {
    return 'Days ago'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      'Month' +
      d.getDate() +
      'Day' +
      d.getHours() +
      'Hour' +
      d.getMinutes() +
      'Minute'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

// 将标准时间转换成时间戳
export function getDateTimeStamp(dateStr) {
  return Date.parse(dateStr.replace(/-/gi, '/'))
}

/**
  * 自动滚动到错误位置
  * @param {*} el 目标元素
  * @param {Object} 滚动参数 scrollOption={
  *   behavior: 'smooth',
  *   block: 'center'
  * }
*/
export const scrollToError = (
  el,
  scrollOption = {
    behavior: 'smooth',
    block: 'center'
  }
) => {
  setTimeout(() => {
    const isError = el.getElementsByClassName('is-error')
    isError[0].scrollIntoView(scrollOption)
  }, 0)
}
