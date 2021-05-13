/**
 * 根据 tag 获取可以设置的propslist 列表
 * @param {*} tag
 *
 * 注意 type 操作数据类型
 * 1：数组可选，采用 el-radio-group
 * 2：简单 input 字符串
 * 3：简单 el-input-number
 * 4. props 是一个弹窗属性
 */
export function getPropsList(tag) {
    const propsList = {
        'el-button': [
            {
                key: 'size',
                list: ['medium', 'small', 'mini'],
                type: '1',
                value: undefined,
                text: '尺寸'
            },
            {
                key: 'type',
                list: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
                type: '1',
                value: undefined,
                text: '类型'
            },
            {
                key: 'plain',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true, // 如果是布尔值，:key="value"，但是不在data中渲染
                text: '是否朴素按钮'
            },
            {
                key: 'round',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true, // 如果是布尔值，:key="value"，但是不在data中渲染
                text: '是否圆角按钮'
            },
            {
                key: 'circle',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true, // 如果是布尔值，:key="value"，但是不在data中渲染
                text: '是否圆形按钮'
            },
            {
                key: 'loading',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true, // 如果是布尔值，:key="value"，但是不在data中渲染
                text: '是否加载中状态'
            },
            {
                key: 'disabled',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true, // 如果是布尔值，:key="value"，但是不在data中渲染
                text: '是否禁用状态'
            },
            {
                key: 'icon',
                type: '2',
                value: '',
                text: '图标类名'
            },
            {
                key: 'autofocus',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true, // 如果是布尔值，:key="value"，但是不在data中渲染
                text: '是否默认聚焦'
            },
            {
                key: 'native-type',
                list: ['button', 'submit', 'reset'],
                type: '1',
                value: 'button',
                text: '原生 type 属性'
            }
        ],
        'el-input': [
            {
                key: 'type',
                list: ['text', 'textarea'],
                type: '1',
                value: 'text',
                text: '类型'
            },
            {
                key: 'placeholder',
                type: '2',
                value: '',
                text: '输入框占位文本'
            },
            {
                key: 'clearable',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否可清空'
            },
            {
                key: 'maxlength',
                type: '3',
                value: '',
                isBool: true,
                text: '原生属性，最大输入长度'
            },
            {
                key: 'minlength',
                type: '3',
                value: '',
                isBool: true,
                text: '原生属性，最小输入长度'
            },
            {
                key: 'show-word-limit',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效'
            },
            {
                key: 'show-password',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否显示切换密码图标'
            },
            {
                key: 'disabled',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '禁用'
            },
            {
                key: 'size',
                list: ['medium', 'small', 'mini'],
                type: '1',
                value: 'small',
                text: '输入框尺寸，只在 type!="textarea" 时有效'
            },
            {
                key: 'prefix-icon',
                type: '2',
                value: '',
                text: '输入框头部图标'
            },
            {
                key: 'suffix-icon',
                type: '2',
                value: '',
                text: '输入框尾部图标'
            },
        ],
        'el-input-number': [
            {
                key: 'size',
                list: ['medium', 'small', 'mini'],
                type: '1',
                value: 'small',
                text: '尺寸'
            },
            {
                key: 'placeholder',
                type: '2',
                value: '',
                text: '输入框占位文本'
            },
            {
                key: 'min',
                type: '3',
                value: '',
                isBool: true,
                text: '设置计数器允许的最小值'
            },
            {
                key: 'max',
                type: '3',
                value: '',
                isBool: true,
                text: '设置计数器允许的最大值'
            },
            {
                key: 'step',
                type: '3',
                value: 1,
                isBool: true,
                text: '计数器步长'
            },
            {
                key: 'step-strictly',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否只能输入 step 的倍数'
            },
            {
                key: 'controls',
                list: [true, false],
                type: '1',
                value: true,
                isBool: true,
                text: '是否使用控制按钮'
            },
            {
                key: 'controls-position	',
                list: ['right'],
                type: '1',
                value: '',
                text: '控制按钮位置'
            },
            {
                key: 'precision',
                type: '3',
                value: '',
                isBool: true,
                text: '数值精度'
            },
            {
                key: 'disabled',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否禁用计数器'
            },
            {
                key: 'label',
                type: '2',
                value: '',
                text: '输入框关联的label文字'
            },
            {
                key: 'name',
                type: '2',
                value: '',
                text: '原生属性'
            }
        ],
        'el-select': [
            {
                key: 'size',
                list: ['medium', 'small', 'mini'],
                type: '1',
                value: 'small',
                text: '尺寸'
            },
            {
                key: 'multiple',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否多选'
            },
            {
                key: 'clearable',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否可以清空选项'
            },
            {
                key: 'placeholder',
                type: '2',
                value: '',
                text: '输入框占位文本'
            },
            {
                key: 'filterable',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否可搜索'
            },
            {
                key: 'value-key',
                type: '2',
                value: 'value',
                text: '作为 value 唯一标识的键名，绑定值为对象类型时必填'
            },
            {
                key: 'disabled',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否禁用'
            },
            {
                key: 'collapse-tags',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '多选时是否将选中值按文字的形式展示'
            },
            {
                key: 'multiple-limit',
                type: '3',
                value: '',
                isBool: true,
                text: '多选时用户最多可以选择的项目数，为 0 则不限制'
            }
        ],
        'el-cascader': [
            {
                key: 'options',
                type: '0',
                value: {},
                text: '可选项数据源，键名可通过 Props 属性配置'
            },
            {
                key: 'props',
                type: '4',
                value: {},
                text: '配置选项'
            },
            {
                key: 'size',
                list: ['medium', 'small', 'mini'],
                type: '1',
                value: 'small',
                text: '尺寸'
            },
            {
                key: 'placeholder',
                type: '2',
                value: '',
                text: '输入框占位文本'
            },
            {
                key: 'disabled',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否禁用'
            },
            {
                key: 'clearable',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否可以清空选项'
            },
            {
                key: 'filterable',
                list: [true, false],
                type: '1',
                value: false,
                isBool: true,
                text: '是否可搜索'
            },
        ]
    }
    //
    return propsList[tag] || []
}
