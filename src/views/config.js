export let list = {
    type: 1,
    tag: 'div',
    className: 'rootclass',
    "list": [
        {
            "key": "b3413fa5-34e9-4c4e-b7df-229ddc6cb253",
            "type": 1,
            "tag": "input",
            "label": "输入框",
            "icon": "el-icon-document-remove",
            "backgroundColor": "#ffffff",
            "issys": 0,
            "options": {
                "type": "text",
                "defaultValue": "",
                "showWordLimit": false,
                "clearable": false,
                "showPassword": false,
                "disabled": false,
                "rows": 2,
                "autosize": false,
                "autocomplete": "off",
                "readonly": false,
                "autofocus": false,
                "validateEvent": true
            },
            "model": "input_6a0ds2kaaajhn9xd0s",
            "rules": [],
            "attr": {
                "className": "",
                "prop": "",
                "label": "输入框",
                "labelWidth": 120,
                "required": false,
                "rules": {},
                "error": "",
                "showMessage": true,
                "inlineMessage": false,
                "size": {}
            }
        },
        {
            "key": "e7b5e64f-5d9f-4feb-98ba-da51e3e6c755",
            type: 1,
            "tag": "select",
            "label": "选择器",
            "icon": "el-icon-arrow-down",
            "backgroundColor": "#ffffff",
            "issys": 0,
            "options": {
                "defaultValue": "",
                "isGroup": false,
                "multiple": false,
                "disabled": false,
                "valueKey": "value",
                "size": "",
                "clearable": false,
                "collapseTags": false,
                "multipleLimit": 0,
                "autocomplete": "off",
                "placeholder": "请选择",
                "filterable": false,
                "allowCreate": false,
                "remote": false,
                "loading": false,
                "loadingText": "加载中",
                "noMatchText": "无匹配数据",
                "noDataText": "无数据",
                "reserveKeyword": false,
                "defaultFirstOption": false,
                "popperAppendToBody": true,
                "automaticDropdown": false
            },
            "model": "select_9plbljynx3dkicby0o",
            "rules": [],
            "attr": {
                "className": "",
                "prop": "",
                "label": "选择器",
                "labelWidth": 120,
                "required": false,
                "rules": {},
                "error": "",
                "showMessage": true,
                "inlineMessage": false,
                "size": {}
            }
        }
    ]
}


export const ast = {
    type: 1,
    tag: 'div',
    className: 'clsass11 ddd',
    props: [
        {
            key: 'model',
            value: 'qwert',
            isData: true
        },
        {
            key: 'checked',
            value: true,
            isData: false
        }
    ],
    // @事件
    events: [
        {
            type: 'click',
            fn: 'getData',
            prefix: ['native', 'stop']
        },
        {
            type: 'select',
            fn: 'selectItem',
            prefix: ['native']
        }
    ],
    children: [
        {
            type: 1,
            tag: 'button',
            className: '222fff',
            props: [
                {
                    key: 'ed',
                    value: 'dkfd',
                    isData: true
                },
                {
                    key: 'op',
                    value: 'fsndjds',
                    isData: false
                }
            ]
        },
        {
            type: 1,
            tag: 'span',
            className: '3333fff'
        }
    ]
}
