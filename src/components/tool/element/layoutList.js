/**
 * 布局组件
 */
export const layoutList = [
    {
        type: 1,
        tag: 'div',
        layout: true,
        className: 'content-body',
        label: '白板-content-body',
        props: [],
        children: []
    },
    {
        type: 1,
        tag: 'div',
        layout: true,
        isRow: true, // 标记是row
        className: 'eboss-row',
        label: 'row-eboss-row',
        props: [],
        children: [
            {
                type: 1,
                tag: 'div',
                layout: true,
                className: 'eboss-col col-flex',
                label: 'col-eboss-col',
                props: []
            },
            {
                type: 1,
                tag: 'div',
                layout: true,
                className: 'eboss-col col-flex',
                label: 'col-eboss-col',
                props: []
            }
        ]
    },
    // eboss-col 废弃这个组件的拖拽，改成父类 eboss-row 去控制
    // {
    //   type: 1,
    //   tag: 'div',
    //   layout: true,
    //   className: 'eboss-col col-flex',
    //   label: 'col-eboss-col',
    //   props: []
    // }
]
