export const antBasciList = [
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
]
