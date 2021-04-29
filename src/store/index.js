import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    template: {
      label: 'eboss',
      value: 'eboss'
    },
    // 选中组件
    selectedWidget: {},
    // 选中父组件
    selectedWidgetParent: {},
    // 选中组件在父组件中的所用
    selectedWidgetIndex: 0,
    selectedWidgetFn: []
  },
  getters: {
    selectTemplate: (state) => {
      return state.template
    },
    selectWidget: (state) => {
      let selectedWidget = state.selectedWidget
      let selectedWidgetParent = state.selectedWidgetParent
      let selectedWidgetIndex = state.selectedWidgetIndex
      let obj = {}
      if (selectedWidget) {
        obj.item = selectedWidget
      }
      if (selectedWidgetParent) {
        obj.parent = selectedWidgetParent
      }
      obj.index = selectedWidgetIndex
      return obj
    },
    selectedWidgetFn: (state) => {
      return state.selectedWidgetFn
    }
  },
  mutations: {
    set_selectTemplate: (state, payload) => {
      state.template = payload
    },
    /**
     * payload:
     * {
     *  item: '选中的元素',
     *  parent: '选中元素的父元素',
     *  index: '选中元素的索引'
     * }
     */
    set_selectWidget: (state, payload) => {
      state.selectedWidget = payload.item || {}
      state.selectedWidgetParent = payload.parent || {}
      state.selectedWidgetIndex = payload.index || 0
    },
    set_selectedWidgetFn: (state, payload) => {
      let flag = false
      state.selectedWidgetFn.forEach(item => {
        if (item.fn === payload.fn) {
          flag = true
        }
      })
      if (!flag) {
        state.selectedWidgetFn.push(payload)
      }
    },
    clear_selectedWidgetFn: (state) => {
      state.selectedWidgetFn = []
    }
  },
  actions: {
  },
  modules: {
  }
})
