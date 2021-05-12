/**
 * 方法列表，供选择，关联fn所有属性
 * notes：注释
 * params：参数
 * body：函数体
 * $type$: 请求方法
 * $url$: 请求url
 * $retData$是否接收返回数据
 * linkFn：关联方法
 */
import { guid } from './tool'
/**
 * 我遇到的方法列表：
 * 1. 通用请求
 * 2. router
 * 3. 新建 - 查看
 */
const list = [
    {
        fn: '通用请求',
        notes: '', // 注释
        params: '',  // 参数
        name: '',
        type: 1,
        body: `
    let params = {}
    this.axios$$method$$('$$url$$', params)
    .then(res => {
        if (res.success) {
            $$retData$$
        } else {
            this.$alert(res.errorMessage, '提示', {showClose: false})
        }
    }).finally(() => {})`
    },
    {
        fn: '普通router跳转',
        notes: '',
        type: 2,
        body: `
    this.$router.push({
      path: '$$url$$',
      query: {$$query$$}
    })`
    },
    {
        fn: '新建 - 查看/编辑',
        notes: '',
        type: 3,
        body: `
    if ($$key$$) {
      // 编辑/查看
      this.$router.push({path: '$$url$$', query: {$$query$$}})
    } else {
      // 新增
      this.$router.push({path: '$$url$$'})
    }
    `
    },
    {
        fn: '新建 - 保存',
        type: 4,
        body: `
    ley url = ''
    if (this.key) {
      url = '
    } else {
      url = ''
    }
    `
    }
]
list.forEach(tag => {
    tag.id = guid()
})

export const fnList = list

export const typeList = [
    {
        key: '数据源（一般为下拉提供v-model或者data）',
        value: 'no'
    },
    {
        key: 'click',
        value: 'click'
    },
    {
        key: 'change',
        value: 'change'
    },
    {
        key: 'select',
        value: 'select'
    }
]

export const methodList = [
    {
        key: 'get',
        value: 'Get'
    },
    {
        key: 'post',
        value: 'Post'
    }
]
