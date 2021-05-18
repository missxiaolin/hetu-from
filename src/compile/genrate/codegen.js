import { isArray, isString, isObj } from '../utils'

// data 数据，用于 ejs 循环
let DATA = []
// events 数据，用于 ejs 循环
let EVENTS = ['init() {$$init$$}']
// 便于全局 opts 控制
let OPTS = {}

/**
 * 初始化数据
 */
function resetGlobalVariables() {
    DATA = []
    // events 数据，用于 ejs 循环
    EVENTS = ['init() {$$init$$},']
    // 便于全局 opts 控制
    OPTS = {}
}

/**
 * 根据 AST 生成 code 代码
 * @param {*} ast
 * @param {*} opts
 */
export function codegen(ast, opts) {
    console.log(ast, opts)
    // 初始化数据
    resetGlobalVariables()
    OPTS = opts
    let code = genElement(ast)
    // code 格式化再处理一下，去掉后面的 \n
    code = code.slice(0, code.length - 1)
    // 去掉最后的标签后添加\t
    let data = DATA
    // EVENTS 兼容去掉isInit中的$$init$$
    let init = EVENTS[0]
    if (init.indexOf('$$init$$') !== -1) {
        EVENTS[0] = EVENTS[0].replace('$$init$$', '')
    }
    let events = [...new Set(EVENTS)];
    return { data, code, events }
}

/**
 * 真正的递归调用的 genElement 方法
 * @param {*} ast
 */
function genElement(ast) {
    if (isArray(ast)) {
        let str = '';
        ast.forEach((node) => {
            str += genElement(node)
        })
        return str
    } else if (isString(ast)) {
        return ast
    } else if (ast === null) {
        return ''
    }
}
