/**
 * 是否是数组
 * @param {*} v 
 * @returns 
 */
export function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]'
}

/**
 * 是否是字符串
 * @param {*} v 
 * @returns 
 */
export function isString(v) {
    return Object.prototype.toString.call(v) === '[object String]'
}

/**
 * 是否是对象
 * @param {*} v 
 * @returns 
 */
export function isObj(v) {
    return Object.prototype.toString.call(v) === '[object Object]'
}