/**
 * 高级组件 - 集成封装后的组件
 * highType：高级组件，渲染和预览必须用到我们自己的判断
 * 1：重置和查询
 * 2：取消和保存
 * 3. 表格顶部按钮
 * 4. table表格
 * 5. 顶部-返回列表
 */
export const highList = [
    {
        type: 1,
        tag: 'dialog',
        label: '弹窗-dialog',
        text: '',
        className: '',
        highType: '0',
        notes: '弹窗',
        props: [
            {
                key: 'title',
                value: 'dialog-title'
            },
            {
                key: 'visible.sync',
                value: '',
                default: false,
                isData: true
            }
        ],
        children: [
            {
                type: 1,
                tag: 'span',
                className: 'dialog-body',
                text: '这是一段信息'
            },
            {
                type: 1,
                tag: 'span',
                className: 'dialog-footer',
                props: [
                    {
                        key: 'slot',
                        value: 'footer'
                    }
                ],
                children: [
                    {
                        type: 1,
                        tag: 'button',
                        className: '',
                        text: '取 消',
                        props: [],
                        // @事件
                        events: [
                            {
                                type: 'click',
                                notes: '取消方法',
                                fn: 'dialogCancel',
                            }
                        ]
                    },
                    {
                        type: 1,
                        tag: 'button',
                        className: '',
                        text: '确 定',
                        props: [
                            {
                                key: 'type',
                                value: 'primary'
                            }
                        ],
                        // @事件
                        events: [
                            {
                                type: 'click',
                                notes: '确定方法',
                                fn: 'dialogConfirm',
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        tag: 'div',
        label: '重置和查询',
        className: 'e-inquire-button text-center',
        highType: '1',
        notes: '重置和查询按钮',
        props: [],
        children: [
            {
                type: 1,
                tag: 'button',
                className: '',
                text: '重置',
                props: [
                    {
                        key: 'size',
                        value: 'small',
                        isData: false
                    }
                ],
                // @事件
                events: [
                    {
                        type: 'click',
                        notes: '重置方法',
                        fn: 'resetSearch',
                        body: `
                // 重置方法
                // this.搜索条件重置
              `
                    }
                ]
            },
            {
                type: 1,
                tag: 'button',
                className: '',
                text: '查询',
                props: [
                    {
                        key: 'size',
                        value: 'small',
                        isData: false
                    },
                    {
                        key: 'type',
                        value: 'primary',
                        isData: false
                    },
                    {
                        key: 'loading',
                        value: 'searchLoading',
                        default: false,
                        isData: true
                    }
                ],
                // @事件
                events: [
                    {
                        type: 'click',
                        notes: '查询加载数据方法',
                        fn: 'loadData',
                        // 函数body
                        body: `this.pageIndex = 1;this.searchList()`,
                        // 关联方法，不是绑定的，而是当前方法调用的
                        linkFn: {
                            notes: '真正的搜索方法 - 重置和查询组件',
                            fn: 'searchList',
                            body: `
                  let params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    model: {}
                  }
                  // 搜索状态
                  this.searchLoading = true
                  this.axiosPost('请求url', params)
                    .then(res => {
                      if (res.success) {
                        this.dataList = res.model
                        this.totalCount = res.totalCount
                      } else {
                        this.$alert(res.errorMessage, '提示', {showClose: false})
                      }
                    }).finally(() => {
                      this.searchLoading = false
                    })`
                        }
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        tag: 'div',
        label: '取消和保存',
        className: 'e-inquire-button text-center',
        highType: '2',
        notes: '取消和保存按钮',
        props: [],
        children: [
            {
                type: 1,
                tag: 'button',
                className: '',
                text: '取消',
                props: [
                    {
                        key: 'size',
                        value: 'small',
                        isData: false
                    }
                ],
                // @事件
                events: [
                    {
                        type: 'click',
                        notes: '页面取消方法',
                        fn: 'cancelHandler',
                    }
                ]
            },
            {
                type: 1,
                tag: 'button',
                className: '',
                text: '保存',
                props: [
                    {
                        key: 'size',
                        value: 'small',
                        isData: false
                    },
                    {
                        key: 'type',
                        value: 'primary',
                        isData: false
                    },
                    {
                        key: 'loading',
                        value: 'saveLoading',
                        default: 'false',
                        isData: true
                    }
                ],
                // @事件
                events: [
                    {
                        type: 'click',
                        notes: '页面保存方法',
                        fn: 'saveHandler',
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        tag: 'div',
        label: '表格顶部按钮',
        className: 'e-feature-btn',
        highType: '3',
        notes: '表格顶部按钮 - 一般是新建等',
        props: [],
        children: [
            {
                type: 1,
                tag: 'div',
                className: 'feature-left',
                children: [
                    {
                        type: 1,
                        tag: 'button ',
                        text: 'left - btns',
                        props: [
                            {
                                key: 'size',
                                value: 'small',
                                isData: false
                            },
                            {
                                key: 'type',
                                value: 'primary',
                                isData: false
                            }
                        ]
                    }
                ]
            },
            {
                type: 1,
                tag: 'div',
                className: 'feature-right',
                children: [
                    {
                        type: 1,
                        tag: 'button ',
                        text: 'right - btns',
                        props: [
                            {
                                key: 'size',
                                value: 'small',
                                isData: false
                            },
                            {
                                key: 'type',
                                value: 'primary',
                                isData: false
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        tag: 'section',
        label: '表格 table',
        className: '',
        highType: '4',
        notes: '我是封装之后的列表表格',
        props: [],
        children: [
            {
                type: 1,
                tag: 'eb-table',
                className: '',
                text: '',
                props: [
                    {
                        key: 'size',
                        value: 'medium',
                        isData: false
                    },
                    {
                        key: 'columns',
                        value: 'columns',
                        notes: '表格表头数据列表',
                        default: [
                            { label: '测试数据', scope: 'test', prop: 'test' },
                            { label: '操作', scope: 'options', prop: 'options' },
                        ], // 默认值，显示在data中的
                        isData: true
                    },
                    {
                        key: 'data',
                        value: 'dataList',
                        notes: '表格显示的数据列表',
                        default: [
                            { test: '我是text1数据' },
                            { test: '我是text2数据' }
                        ], // 默认值，显示在data中的
                        isData: true
                    },
                    {
                        key: 'total',
                        value: 'totalCount',
                        notes: '总条目数',
                        default: 0,
                        isData: true
                    },
                    {
                        key: 'pageSize',
                        value: 'pageSize',
                        notes: '每页显示条目个数',
                        default: 10,
                        isData: true
                    },
                    {
                        key: 'current-page',
                        value: 'pageIndex',
                        notes: '当前页数',
                        default: 1,
                        isData: true
                    },
                    {
                        key: 'empty-text',
                        value: '暂无查询结果',
                        isData: false
                    }
                ],
                // @事件
                events: [
                    {
                        type: 'size-change',
                        notes: 'pageSize 改变时会触发',
                        fn: 'handleSizeChange',
                        params: ['size'],
                        // 函数body
                        body: `this.pageSize = size;this.searchList()`
                    },
                    {
                        type: 'currentChange',
                        notes: 'currentPage 改变时会触发',
                        fn: 'handleCurrentChange',
                        params: ['current'],
                        // 函数body
                        body: `this.pageIndex = current;this.searchList()`,
                        // 关联方法，不是绑定的，而是当前方法调用的
                        linkFn: {
                            notes: '真正的搜索方法 - table 组件',
                            fn: 'searchList',
                            body: `
                let params = {
                  pageIndex: this.pageIndex,
                  pageSize: this.pageSize,
                  model: {}
                }
                // 搜索状态
                this.searchLoading = true
                this.axiosPost('请求url', params)
                  .then(res => {
                    if (res.success) {
                      this.dataList = res.model
                      this.totalCount = res.totalCount
                    } else {
                      this.$alert(res.errorMessage, '提示', {showClose: false})
                    }
                  }).finally(() => {
                    this.searchLoading = false
                  })`
                        }
                    }
                ],
                children: [
                    // 一个template slot，和一个options
                    {
                        type: 1,
                        tag: 'template',
                        notes: 'test - slot - scope',
                        text: '{{scope.row}}',
                        props: [
                            {
                                key: 'test',
                                value: 'scope',
                                symbal: '#', // 前缀符号
                                isData: false
                            }
                        ],
                        children: []
                    },
                    {
                        type: 1,
                        tag: 'template',
                        notes: 'test - 操作 - scope - 一般包含 删除 编辑等',
                        props: [
                            {
                                key: 'options',
                                value: 'scope',
                                symbal: '#', // 前缀符号
                                isData: false
                            }
                        ],
                        children: [
                            {
                                type: 1,
                                tag: 'button',
                                text: '操作按钮{{scope.row}}',
                                props: [
                                    {
                                        key: 'size',
                                        value: 'small',
                                        isData: false
                                    },
                                    {
                                        key: 'type',
                                        value: 'primary',
                                        isData: false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        tag: 'div',
        className: 'content-top-column',
        highType: '5',
        label: '顶部-返回列表',
        props: [],
        children: [
            {
                type: 1,
                tag: 'h2',
                className: '',
                text: '顶部-h2',
                props: []
            },
            {
                type: 1,
                text: '返回列表',
                tag: 'button',
                className: '',
                props: [
                    {
                        key: 'size',
                        value: 'mini',
                        isData: false
                    },
                    {
                        key: 'type',
                        value: 'warning',
                        isData: false
                    }
                ],
                // @事件
                events: [
                    {
                        type: 'click',
                        notes: '返回列表',
                        fn: 'handleJumpList',
                        params: ['isRefresh'],
                        // 函数body
                        body: `this.routeBack({path: ''}, isRefresh)`
                    }
                ]
            }
        ]
    },
    {
        type: 1,
        tag: 'div',
        className: 'body-header',
        highType: '6',
        label: '标题-body-header',
        props: [],
        children: [
            {
                type: 1,
                tag: 'h4',
                className: '',
                text: '顶部-h4',
                props: []
            }
        ]
    }
]
