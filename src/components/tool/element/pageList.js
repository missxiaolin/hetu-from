/**
 * template 页面
 */
export const pageList = [
    {
        type: 1,
        tag: 'template',
        layout: true,
        label: '搜索查询列表页面模板',
        className: '',
        props: [],
        notes: '我是根据页面模板拖拽生成的骨架结构，有一层 template 未渲染',
        children: [
            {
                type: 1,
                tag: 'div',
                layout: true,
                className: 'content-body',
                label: '白板-content-body',
                props: [],
                children: [
                    {
                        type: 1,
                        tag: 'div',
                        layout: true,
                        isRow: true, // 标记是row
                        className: 'e-row',
                        label: 'row-e-row',
                        props: [],
                        children: [
                            {
                                type: 1,
                                tag: 'div',
                                layout: true,
                                className: 'e-col col-flex',
                                label: 'col-e-col',
                                props: [],
                                children: [
                                    {
                                        type: 1,
                                        isInputForm: true, // 如果是 el-form 元素，格式特殊，需要处理
                                        prop: '我是input',
                                        tag: 'input',
                                        label: '输入框',
                                        className: '',
                                        props: [
                                            {
                                                key: 'v-model',
                                                value: '',
                                                default: '',
                                                isData: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 1,
                                tag: 'div',
                                layout: true,
                                className: 'e-col col-flex',
                                label: 'col-e-col',
                                props: [],
                                children: [
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
                                            }
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
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 1,
                        tag: 'div',
                        layout: true,
                        isRow: true, // 标记是row
                        className: 'e-row',
                        label: 'row-e-row',
                        props: [],
                        children: [
                            {
                                type: 1,
                                tag: 'div',
                                layout: true,
                                className: 'e-col col-flex',
                                label: 'col-e-col',
                                props: [],
                                children: []
                            },
                            {
                                type: 1,
                                tag: 'div',
                                layout: true,
                                className: 'e-col col-flex',
                                label: 'col-e-col',
                                props: [],
                                children: []
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
                                        // table中只有searchList和这个是重复的
                                        // 关联方法，不是绑定的，而是当前方法调用的
                                        // 表格关联的也是这个，所以会重复出现
                                        // linkFn: {
                                        // notes: '真正的搜索方法-表格关联的也是这个，所以会重复出现',
                                        // fn: 'searchList',
                                        // body: `
                                        // let params = {
                                        //   pageIndex: this.pageIndex,
                                        //   pageSize: this.pageSize,
                                        //   model: {}
                                        // }
                                        // // 搜索状态
                                        // this.searchLoading = true
                                        // this.axiosPost('请求url', params)
                                        //   .then(res => {
                                        //     if (res.success) {
                                        //       this.dataList = res.model
                                        //       this.totalCount = res.totalCount
                                        //     } else {
                                        //       this.$alert(res.errorMessage, '提示', {showClose: false})
                                        //     }
                                        //   }).finally(() => {
                                        //     this.searchLoading = false
                                        //   })`
                                        // }
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
                                    { label: '测试数据', scope: 'text', prop: 'text' },
                                    { label: '操作', scope: 'options', prop: 'options' },
                                ], // 默认值，显示在data中的
                                isData: true
                            },
                            {
                                key: 'data',
                                value: 'dataList',
                                notes: '表格显示的数据列表',
                                default: [
                                    { text: '我是text1数据' },
                                    { text: '我是text2数据' }
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
                                    notes: '真正的搜索方法 - 搜索查询列表页面模板',
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
        ]
    },
    {
        type: 1,
        tag: 'template',
        layout: true,
        label: '列表详情页面',
        className: '',
        props: [],
        notes: '我是根据页面模板拖拽生成的骨架结构，有一层 template 未渲染',
        children: [
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
                tag: 'section',
                layout: true,
                className: 'content-body',
                label: '白板-content-body',
                props: [],
                children: [
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
                    },
                    {
                        type: 1,
                        tag: 'div',
                        layout: true,
                        className: 'pall15',
                        label: '',
                        text: '',
                        props: [],
                        children: [
                            {
                                type: 1,
                                tag: 'div',
                                layout: true,
                                isRow: true, // 标记是row
                                className: 'e-row',
                                label: 'row-e-row',
                                props: [],
                                children: [
                                    {
                                        type: 1,
                                        tag: 'div',
                                        layout: true,
                                        className: 'e-col col-flex',
                                        label: 'col-e-col',
                                        props: [],
                                        children: []
                                    },
                                    {
                                        type: 1,
                                        tag: 'div',
                                        layout: true,
                                        className: 'e-col col-flex',
                                        label: 'col-e-col',
                                        props: [],
                                        children: []
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                type: 1,
                tag: 'section',
                layout: true,
                className: 'content-body mt20',
                label: '白板-content-body',
                props: [],
                children: [
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
                    },
                    {
                        type: 1,
                        tag: 'div',
                        layout: true,
                        className: 'pall15',
                        label: '',
                        text: '',
                        props: [],
                        children: [
                            {
                                type: 1,
                                tag: 'div',
                                layout: true,
                                isRow: true, // 标记是row
                                className: 'e-row',
                                label: 'row-e-row',
                                props: [],
                                children: [
                                    {
                                        type: 1,
                                        tag: 'div',
                                        layout: true,
                                        className: 'e-col col-flex',
                                        label: 'col-e-col',
                                        props: [],
                                        children: []
                                    },
                                    {
                                        type: 1,
                                        tag: 'div',
                                        layout: true,
                                        className: 'e-col col-flex',
                                        label: 'col-e-col',
                                        props: [],
                                        children: []
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                type: 1,
                tag: 'section',
                layout: true,
                className: 'content-body',
                label: '白板-content-body',
                props: [],
                children: [
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
                    },
                    {
                        type: 1,
                        tag: 'div',
                        layout: true,
                        className: 'pall15',
                        label: '',
                        text: '',
                        props: [],
                        children: [
                            {
                                type: 1,
                                tag: 'div',
                                layout: true,
                                isRow: true, // 标记是row
                                className: 'e-row',
                                label: 'row-e-row',
                                props: [],
                                children: [
                                    {
                                        type: 1,
                                        tag: 'div',
                                        layout: true,
                                        className: 'e-col col-flex',
                                        label: 'col-e-col',
                                        props: [],
                                        children: []
                                    },
                                    {
                                        type: 1,
                                        tag: 'div',
                                        layout: true,
                                        className: 'e-col col-flex',
                                        label: 'col-e-col',
                                        props: [],
                                        children: []
                                    }
                                ]
                            },
                        ]
                    },
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
        ]
    }
]
