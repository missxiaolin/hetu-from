/**
 * jsonList 数据转化为 AST
 * @param {*} jsonList 元素list
 * @param {*} opts 优化配置
 */

export function parser(jsonList, opts = {}) {
    // console.log('parser --- ', jsonList, opts)
    // 这里递归parser，否则就在拖拽生成json的时候去处理
    return parserAST(jsonList, opts)
}

function parserAST(jsonList) {
    return jsonList
}
