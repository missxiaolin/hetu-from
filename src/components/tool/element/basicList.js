/**
 * 基础组件 - 需要加工
 */
export const basicList = [
    {
        type: 1,
        isInputForm: false, // 如果是 el-form 元素，格式特殊，需要处理
        text: '我是button',
        tag: 'button',
        label: '按钮',
        className: '',
        props: [
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ]
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是input', // el-form-item 对应的是prop
        tag: 'input',
        label: '输入框',
        className: '',
        props: [
            {
                key: 'v-model', // v-model 在codegen 会绑定 model 属性
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ]
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是input-number', // el-form-item 对应的是prop
        tag: 'input-number',
        label: '计数器',
        className: '',
        props: [
            {
                key: 'v-model', // v-model 在codegen 会绑定 model 属性
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ]
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是select', // el-form-item 对应的是prop
        tag: 'select',
        label: '选择器',
        className: '',
        props: [
            {
                key: 'v-model',
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ],
        children: [
            {
                type: 1,
                text: '',
                tag: 'option',
                label: '选择器option',
                className: '',
                props: [
                    {
                        key: 'v-for', // v-for="(item, index) in model" :key="index"
                        value: '', // options采用model
                        default: [],
                        isData: true
                    },
                    {
                        key: 'label',
                        value: 'item.label',
                        isBool: true // isBool 不仅仅是值是布尔值，而且可以算是不想在data中设置的
                    },
                    {
                        key: 'value',
                        value: 'item.key',
                        isBool: true // isBool 不仅仅是值是布尔值，而且可以算是不想在data中设置的
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是cascader', // el-form-item 对应的是prop
        tag: 'cascader',
        label: '级联选择器',
        className: '',
        props: [
            {
                key: 'v-model',
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
            {
                key: 'options',
                value: 'cascader_options',
                default: [],
                isData: true
            },
            {
                key: 'props',
                value: '{}',
                default: {},
                isData: false,
                isBool: true,
                children: [
                    {
                        key: 'expandTrigger', // 参数
                        tetx: '次级菜单的展开方', // 说明
                        type: 'string', // 类型
                        values: 'click / hover', // 可选值
                        default: 'click', // 默认值
                    },
                    {
                        key: 'multiple', // 参数
                        tetx: '是否多选', // 说明
                        type: 'boolean', // 类型
                        values: '-', // 可选值
                        default: false, // 默认值
                    },
                    {
                        key: 'checkStrictly', // 参数
                        tetx: '是否严格的遵守父子节点不互相关联', // 说明
                        type: 'boolean', // 类型
                        values: '-', // 可选值
                        default: false, // 默认值
                    },
                    {
                        key: 'emitPath', // 参数
                        tetx: '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值', // 说明
                        type: 'boolean', // 类型
                        values: '-', // 可选值
                        default: true, // 默认值
                    },
                    {
                        key: 'lazy', // 参数
                        tetx: '是否动态加载子节点，需与 lazyLoad 方法结合使用', // 说明
                        type: 'boolean', // 类型
                        values: '-', // 可选值
                        default: false, // 默认值
                    },
                    {
                        key: 'lazyLoad', // 参数
                        tetx: '加载动态数据的方法，仅在 lazy 为 true 时有效', // 说明
                        type: 'function', // 类型
                        values: '-', // 可选值
                        default: '', // 默认值
                    },
                    {
                        key: 'value', // 参数
                        tetx: '指定选项的值为选项对象的某个属性值', // 说明
                        type: 'string', // 类型
                        values: '-', // 可选值
                        default: "value'", // 默认值
                    },
                    {
                        key: 'label', // 参数
                        tetx: '指定选项标签为选项对象的某个属性值', // 说明
                        type: 'string', // 类型
                        values: '-', // 可选值
                        default: "'label'", // 默认值
                    },
                    {
                        key: 'children', // 参数
                        tetx: '指定选项的子选项为选项对象的某个属性值', // 说明
                        type: 'string', // 类型
                        values: '-', // 可选值
                        default: "'children'", // 默认值
                    },
                    {
                        key: 'disabled', // 参数
                        tetx: '指定选项的禁用为选项对象的某个属性值', // 说明
                        type: 'string', // 类型
                        values: '-', // 可选值
                        default: "'disabled'", // 默认值
                    },
                    {
                        key: 'leaf', // 参数
                        tetx: '指定选项的叶子节点的标志位为选项对象的某个属性值', // 说明
                        type: 'string', // 类型
                        values: '-', // 可选值
                        default: "'leaf'", // 默认值
                    }
                ]
            }
        ],
        children: []
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是date-picker', // el-form-item 对应的是prop
        tag: 'date-picker',
        label: '日期选择器',
        value: '',
        className: '',
        defaultValue: '', // 特殊v-model
        props: [
            {
                key: 'v-model',
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'type',
                value: 'data',
                default: '',
                isData: false
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            }
        ],
        children: []
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是radio-group', // el-form-item 对应的是prop
        tag: 'radio-group',
        label: '单选框组',
        className: '',
        props: [
            {
                key: 'v-model',
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ],
        children: [
            {
                type: 1,
                prop: '我是el-radio', // el-form-item 对应的是prop
                tag: 'el-radio',
                label: '单选框组',
                className: '',
                props: [
                    {
                        key: 'label', // v-for="(item, index) in model" :key="index"
                        value: '', // options采用model
                        default: '',
                        isBool: true
                    }
                ]
            },
            {
                type: 1,
                prop: '我是el-radio', // el-form-item 对应的是prop
                tag: 'el-radio',
                label: '单选框组',
                className: '',
                props: [
                    {
                        key: 'label', // v-for="(item, index) in model" :key="index"
                        value: '', // options采用model
                        default: '',
                        isBool: true
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是checkbox-group', // el-form-item 对应的是prop
        tag: 'checkbox-group',
        label: '多选框组',
        className: '',
        props: [
            {
                key: 'v-model',
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ],
        children: [
            {
                type: 1,
                prop: '我是el-checkbox', // el-form-item 对应的是prop
                tag: 'checkbox',
                label: '多选框组',
                className: '',
                props: [
                    {
                        key: 'label', // v-for="(item, index) in model" :key="index"
                        value: '', // options采用model
                        default: '',
                        isBool: true
                    }
                ]
            },
            {
                type: 1,
                prop: '我是el-checkbox', // el-form-item 对应的是prop
                tag: 'checkbox',
                label: '多选框组',
                className: '',
                props: [
                    {
                        key: 'label', // v-for="(item, index) in model" :key="index"
                        value: '', // options采用model
                        default: '',
                        isBool: true
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是switch', // el-form-item 对应的是prop
        tag: 'switch',
        label: '开关',
        className: '',
        props: [
            {
                key: 'v-model',
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ],
        children: []
    },
    {
        type: 1,
        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
        prop: '我是color-picker', // el-form-item 对应的是prop
        tag: 'color-picker',
        label: '颜色选择器',
        className: '',
        props: [
            {
                key: 'v-model',
                value: '',
                default: '',
                isData: true
            },
            {
                key: 'size', // 参数
                tetx: '尺寸', // 说明
                type: 'string', // 类型
                value: 'small', // 值
                default: 'small', // 默认值
            },
        ],
        children: []
    }
]
