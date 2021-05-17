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
}
