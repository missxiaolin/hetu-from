import { parser } from './parser/parser'
import { optimize } from './optimizer/optimize'
import genrate from './genrate/index'

/**
 * 创建 compiler
 * @param {*} template
 * @param {*} options
 */
export const compiler = function (list, options = {}) {
    const ast = parser(list, options)
    if (options.optimize !== false) {
        optimize(ast, options)
    }
    let { code, data, events } = genrate.codegen(ast, options)
    // options.template 专门是为了渲染 .vue整个文件的
    if (options.template) {
        let ret = ''
        // 生成的是template
        ret = genrate.temgen({ code: code, data: data, events: events }, options)
        // // console.log('compiler', code, data, events, ret, options)
        return {
            ast,
            code: code, // code 是 特指 html部分
            data: data, // data
            events: events, // 事件对象
            templateStr: ret // 整个文件
        }
    } else {
        // console.log('compiler', code, data, events, options)
        return {
            ast,
            code: code,
            data: data,
            events: events
        }
    }

}
