<template>
  <div>
    <!-- 我是layout组件，我可以继续拖拽{{data}} -->
    <vuedraggable
      tag="div"
      :class="[
        data.className || '',
        { selected: selectKey === selectWidget.item.key },
      ]"
      style="border: 1px dashed #999; position: relative"
      v-model="data.children"
      v-bind="{ group: 'people', ghostClass: 'ghost' }"
      @add="handleWidgetLayoutAdd"
      @click.prevent.stop.native="handleSelectWidget"
    >
      <template v-for="(item, idx) in data.children">
        <!-- 循环嵌套layout -->
        <template v-if="item.layout">
          <!-- 内置slot，展示text -->
          <form-layout :data="item" :key="idx" :parent="data" :index="idx">{{
            item.text
          }}</form-layout>
          <div
            :key="idx + Math.random()"
            class="widget-view-action widget-col-action"
          >
            <i
              class="iconfont icon-trash"
              @click.stop="handleWidgetDelete(idx)"
            ></i>
          </div>
        </template>
        <!-- 组件 - 无法进行嵌套 -->
        <template v-else>
          <form-element
            :data="item"
            :key="idx"
            :parent="data"
            :index="idx"
          ></form-element>
        </template>
      </template>
      <!-- 这里不能添加按钮，添加后无法拖拽元素进来 -->
      <slot></slot>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import { addDraggerWidget } from '../tool/tool.js'

// 组件循环
import formLayout from "./formLayout";
import formElement from "./formElement";

import { mapGetters } from "vuex";

export default {
  name: "formLayout",
  components: {
    vuedraggable,
    formLayout,
    formElement,
  },
  props: {
    data: {
      type: Object,
    },
    parent: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      selectKey: "",
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["selectWidget"]),
    ...mapGetters(["selectTemplate"]),
  },
  created() {},
  mounted() {},
  methods: {
    // 拖拽元素进 layout 布局中
    handleWidgetLayoutAdd({ newIndex }) {
      // 这里是为了重新渲染组件
      // console.log('添加元素到布局layout', this.data, newIndex)
      let tabCount = this.data.tabCount;
      let returnItem = addDraggerWidget(
        this.data.children[newIndex],
        tabCount,
        this.selectTemplate
      );
      // 给返回数据添加双向绑定
      this.$set(this.data.children, newIndex, returnItem);
      // 记录当前拖拽进去的item元素
      this.$store.commit("set_selectWidget", {
        item: returnItem,
        parent: this.data,
        index: newIndex,
      });
    },
    // 点击选中元素触发的方法
    handleSelectWidget() {
      // console.log('layout', this.data, this.parent, this.index)
      this.selectKey = this.data.key;
      this.$store.commit("set_selectWidget", {
        item: this.data,
        parent: this.parent,
        index: this.index,
      });
    },
    handleWidgetDelete(index) {
      if (this.data.children.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.children[index - 1];
        }
      } else {
        this.selectWidget = this.data.children[index + 1];
      }
      this.$nextTick(() => {
        this.data.children.splice(index, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-btn {
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 1009;
}
.selected {
  border: 1px solid red !important;
}
</style>