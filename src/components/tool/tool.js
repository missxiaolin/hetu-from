
import { getTag } from './tagList/index.js'
/**
 * 拖拽控件方法 - 所有模板通用
 * @param {*} item 元素
 * @param {*} tabCount 父类传递进来的tabCount
 */
export function addDraggerWidget(item, tabCount, template) {
    if (!item) {
        return
    }
    // 最终返回的构建完毕的item
    let returnItem = null
    // item：默认列表中元素所有属性
    let copyItem = deepClone(item)
    // 取出type
    copyItem.tag = getTag(copyItem.tag) || copyItem.tag
    let copyItemTag = copyItem.tag
    // 如果是template，略过渲染，所以
    if (copyItem.tag === 'template') {
        // tabCount
        copyItem.tabCount = tabCount + 0
    } else {
        // tabCount
        copyItem.tabCount = tabCount + 1
    }
    // 数据兼容写法 - 防止undefined的出现
    copyItem.className = copyItem.className || ''
    // 获取唯一key
    let key = guid()

    // hash
    let modelname = createHash()
    copyItem.children = copyItem.children || []
    copyItem.events = copyItem.events || []
    copyItem.props = copyItem.props || []

    // 递归处理嵌套组件，比如row
    if (copyItem.children && copyItem.children.length > 0) {
        copyItem.children = copyItem.children.map(itm => {
            return addDraggerWidget(itm, copyItem.tabCount, template)
        })
    }
    if (copyItem.key) {
        returnItem = copyItem
    } else {
        // 初始化进来是这个
        returnItem = {
            ...copyItem,
            key,
            model: copyItemTag.replace(new RegExp("-", "gm"), '_') + '_' + modelname
        }
    }
    return returnItem
}


/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} item
 */
export function deepClone(item) {
    let copy
    if (item === null || typeof item !== 'object') {
        return item
    }
    // array
    if (item instanceof Array) {
        copy = []
        let len = item.length
        for (let i = 0; i < len; i++) {
            // 循环深克隆
            copy[i] = deepClone(item[i])
        }
        return copy
    }
    // object
    if (item instanceof Object) {
        copy = {}
        for (let val in item) {
            if (item.hasOwnProperty(val)) {
                copy[val] = deepClone(item[val])
            }
        }
        return copy
    }
    // date
    if (item instanceof Date) {
        copy = new Date()
        copy.setTime(item.getTime())
        return copy
    }

    throw new Error("Unable to copy item! Its type isn't supported.")
}

/**
 * 获取随机id
 */
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0
        let v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
/**
 * 构建hash
 */
export function createHash(hashLength) {
    if (!hashLength || typeof (Number(hashLength)) !== 'number') {
        hashLength = 18
    }
    var ar = '1,2,3,4,5,6,7,8,9,0,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',')
    var hs = []
    var hl = Number(hashLength)
    var al = ar.length
    for (var i = 0; i < hl; i++) {
        hs.push(ar[Math.floor(Math.random() * al)])
    }
    return hs.join('')
}
