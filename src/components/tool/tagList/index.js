import { getElementTag } from './element-ui'
// import { getHtmlTag } from './html'
import { getAntDesignTag } from './ant-design'
import store from '@/store'

export function getTag(tag) {
    const template = store.getters.selectTemplate.value
    console.log(template, tag)
    let ret = ''
    if (template === 'e') {
        ret = getElementTag(tag)
    } else if (template === 'react') {
        ret = getAntDesignTag(tag)
    }
    return ret
}
