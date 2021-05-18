import { isArray, isString, isObj } from '../utils'
// data 数据，用于 ejs 循环
let DATA = []
// events 数据，用于 ejs 循环
let EVENTS = ['init() {$$init$$}']
// 便于全局 opts 控制
let OPTS = {}

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
    let code = ''
    if (ast.type === 1) {
        code = genType1(ast)
    } else if (ast.type === 3) {
        code = genType3(ast)
    }
    if (isArray(code)) {
        const arr = code.map(item => {
            if (isObj(item)) {
                return genElement(item)
            } else if (isArray(item)) {
                return genElement(item)
            }
            return item
        })
        return arr.join('')
    } else {
        return code
    }
}

/**
 * type:1，代表当前节点类型为标签
 * @param {*} node
 */
function genType1(node) {
    // console.log('genType1', node.className, node.tabCount, node.label)
    // 这里的tab处理一切都是为了渲染出来的code对齐，没有任何其余的意义
    let len = node.tabCount
    let tabStr = '\t'
    for (let i = 0; i < len; i++) {
        tabStr += '\t'
    }
    if (len > 0) {
        tabStr += '\t'
    }
    // 如果是 template 略过渲染，注意 table 也有template，所以添加 layout 判断
    // template 出事是为了页面template结构去做的
    if (node.tag === 'template' && node.layout) {
        return [
            tabStr,
            getNotes(node, tabStr),
            node.children
        ]
    }
    return [
        getNotes(node, tabStr),
        genInputForm(node, tabStr),
        node.isInputForm ? tabStr + '\t' : tabStr,
        '<',
        node.tag,
        node.className ? ['', genClass(node.className, ' '), ''] : '',
        node.props && node.props.length > 0 ? [' ', genProps(node.props, ' ', node), ' '] : '',
        node.events && node.events.length > 0 ? [' ', genEvents(node.events, ' '), ' '] : '',
        node.text && node.text.length > 0 ? '>' : '>\n', // 如果有text，不换行
        node.text,
        node.children,
        node.isInputForm ? '\t' + getEndTabStr(node, len, tabStr) : getEndTabStr(node, len, tabStr),
        // 如果是有text，没有缩进
        '</',
        node.tag,
        '>\n',
        genInputFormEnd(node, tabStr)
    ]
}

function getEndTabStr(node, len, tabStr) {
    if (node.text) {
        return ''
    }
    return len === 0 ? tabStr + '\t' : tabStr
}
/**
 * 获取和添加注释
 * @param {*} node 元素
 * @param {*} tabStr 缩进
 */
function getNotes(node, tabStr) {
    if (node.notes) {
        return tabStr + `<!-- 注释：${node.notes} -->` + '\n'
    }
    return ''
}

/**
 * 如果是 el-input-form 元素，需要特殊处理，基于eboss代码
 * @param {*} node 元素
 * @param {*} tabStr 缩进
 */
function genInputForm(node, tabStr) {
    if (node.isInputForm) {
        return tabStr + `<label class="form-label">${node.prop}</label>\n${tabStr}<div class="form-control">\n`
    }
    return ''
}

function genInputFormEnd(node, tabStr) {
    if (node.isInputForm) {
        return `${tabStr}</div>\n`
    }
    return ''
}
/**
 * type:3，普通文本节点
 * @param {*} ast
 */
function genType3(ast) {
    console.log(ast)
}

/**
 * 构建 class 属性 class="sd ss"
 * @param {*} cls
 * @param {*} symbal
 */
function genClass(cls, symbal) {
    return `${symbal}class="${cls}"`
}

/**
 * 构建 props 属性 :model="qwert" :checked="true" 等
 * @param {*} props
 * @param {*} symbal
 * key：key
 * value；data中的变量名称，在html属性中是变量值
 * symbal：前缀符号 table中也有
 * notes：注释
 * default：默认值
 * isData：是否放到data中
 * isBool: true, // 如果是布尔值，:key="value"，但是不在data中渲染
 */
function genProps(props, symbal, node) {
    if (props.length === 0) {
        return ''
    }
    let arr = []
    props.forEach((item, index) => {
        let str = ''
        if (item.isData) {
            if (item.key === 'v-model' || item.key === 'v-for') {
                str += ''
            } else {
                str += ':'
            }
        }
        // 前缀，目前props仅仅发现 #test="scope"
        // events 不是这里处理的
        if (item.symbal) {
            str += item.symbal
        }
        // 处理 v-model以及dialog的visible.sync
        if (item.key === 'v-model' || item.key === 'visible.sync') {
            str += `${item.key}="${node.model}"`
        } else if (item.key === 'v-for') {
            str += `${item.key}="(item, index) in ${node.model}" :key="index"`
        } else {
            str += `${item.key}="${item.value}"`
        }
        // 处理布尔值prop渲染，前面添加 :，因为isBool的isData肯定是false，所以之前没有添加:
        if (item.isBool) {
            str = ':' + str
        }
        arr.push(str)
        if (index < props.length - 1) {
            arr.push(symbal)
        }
        // isData：存放到data中
        if (item.isData) {
            // DATA 中的数据 value: 默认值
            // default： '', 'false', 数组[] 不存在，0等
            let defaul = item.default
            // 注释处理
            if (item.notes && item.notes.length > 0) {
                DATA.push(`// ${item.notes}`)
            }
            if (item.key === 'v-model' || item.key === 'v-for' || item.key === 'visible.sync') {
                // v-model model: value
                DATA.push(`'${node.model}': ${JSON.stringify(defaul)}`)
            } else {
                DATA.push(`${item.value}: ${JSON.stringify(defaul)}`)
            }
        }
    })
    return arr
}

/**
 * 构建 events 属性 @click="getclick" @select="selectedItem" 等
 * @param {*} props
 * @param {*} symbal
 *
 *
 */
function genEvents(events, symbal) {
    // console.log('genEvents', events, symbal)
    if (events.length === 0) {
        return ''
    }
    // prevView：预览模式，预览代码不添加methods
    if (OPTS.prevView) {
        return ''
    }
    // 'test () {},'
    let arr = []
    events.forEach((item, index) => {
        // 如果包含在isInit 初始化方法
        if (item.isInit) {
            EVENTS[0] = EVENTS[0].replace('$$init$$', `this.${item.fn}();`)
        }
        // @click.stop.xxx 如果是no，不添加
        if (item.type !== 'no') {
            let str = `@${item.type || 'click'}`
            if (item.prefix && item.prefix.length > 0) {
                item.prefix.forEach(itm => {
                    str = str + `.${itm}`
                })
            }
            str = str + `="${item.fn}"`
            arr.push(str)
        }
        if (index < events.length - 1) {
            arr.push(symbal)
        }
        // 处理注释
        if (item.notes && item.notes.length > 0) {
            EVENTS.push(`// ${item.notes}`)
        }
        let body = ''
        if (item.body && item.body.length > 0) {
            body = `{${item.body}}`
        } else {
            body = `{}`
        }
        // 处理参数
        let params = ''
        if (item.params && item.params.length > 0) {
            params = '(' + item.params.join(', ') + ')'
        } else {
            params = '()'
        }
        EVENTS.push(`${item.fn} ${params} ${body},`)
        let linkFn = item.linkFn
        if (linkFn && Object.keys(linkFn).length > 0) {
            let fn = item.linkFn.fn
            if (!fn || fn === '') {
                // console.log('关联的fn方法名称不能为空')
                return
            }
            // 注释处理
            if (linkFn.notes && linkFn.notes.length > 0) {
                EVENTS.push(`// ${linkFn.notes}`)
            }
            let body = ''
            if (linkFn.body && linkFn.body.length > 0) {
                body = `{${linkFn.body}}`
            } else {
                body = `{}`
            }
            // 处理参数
            let params = ''
            if (linkFn.params && linkFn.params.length > 0) {
                params = '(' + linkFn.params.join(',') + ')'
            } else {
                params = '()'
            }
            EVENTS.push(`${linkFn.fn} ${params} ${body},`)
        }
    })
    return arr
}
