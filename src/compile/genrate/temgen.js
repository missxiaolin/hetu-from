import ejs from 'ejs'
import { defaultTemplate } from './template/default'
import { hydraTemplate } from './template/hydra'
import { reactTemplate } from './template/react'
let temp = {
    hydra: hydraTemplate,
    e: defaultTemplate,
    react: reactTemplate
}
export function temgen(codeOpts = {}, opts = {}) {
    let code = codeOpts.code || ''
    let data = codeOpts.data || []
    let events = codeOpts.events || []
    // console.log('temgen', data, events)
    // 构建模板
    let template = ''
    if (opts.templateName) {
        // console.log(opts.templateName)
        template = temp[opts.templateName.value]
    } else {
        template = defaultTemplate
    }
    // debugger
    if (opts.templateName.value === 'react') {
        let result = ejs.render(template, {
            className: 'demo',
            code: code,
            state: data,
            events: events
        })
        return result
    }
    if (opts.templateName.value === 'e') {
        let result = ejs.render(template, {
            code: code,
            data: data,
            events: events
        })
        return result
    }
    return ''
}


