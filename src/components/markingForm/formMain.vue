<template>
  <div>
    <vuedraggable
      tag="section"
      class="main-content"
      style="min-height: 700px"
      v-model="data.children"
      v-bind="{ group: 'people', ghostClass: 'ghost' }"
      @add="handleWidgetAdd"
    >
      <!-- {{data}} -->
      <!-- 拖拽过来的内容渲染 -->
      <div
        v-for="(item, index) in data.children || []"
        :key="index"
        class="vuedraggableitem"
      >
        <!-- 布局，可以进行嵌套拖拽 -->
        <template v-if="item.layout">
          <form-layout :data="item" :parent="data" :index="index"></form-layout>
        </template>
        <!-- 组件 - 无法进行嵌套 -->
        <template v-else>
          <form-element
            :data="item"
            :parent="data"
            :index="index"
          ></form-element>
        </template>
      </div>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import { mapGetters } from "vuex";
import { addDraggerWidget } from "../tool/tool.js";
import formLayout from "./formLayout";
import formElement from "./formElement";

export default {
  name: "formMain",
  components: {
    vuedraggable,
    formLayout,
    formElement,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters(["selectWidget"]),
    ...mapGetters(["selectTemplate"]),
  },
  created() {},
  mounted() {},
  methods: {
    // 拖拽元素添加的时候调用
    handleWidgetAdd({ newIndex }) {
      // 这里是为了重新渲染组件
      // console.log('添加元素到main', this.data.children, newIndex)
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
      // 处理添加的元素events
      // 1. 先清空，因为拖拽过来就是新的
      this.$store.commit("clear_selectedWidgetFn");
      // 2. 按类型添加
      if (returnItem.highType && returnItem.highType !== "") {
        this.handleHighTypeWidget(returnItem);
      } else {
        // 普通元素添加events
        returnItem.events.forEach((itm) => {
          // 这里一定要保存对象，引用数据类型
          this.$store.commit("set_selectedWidgetFn", itm);
        });
      }
    },
    // 处理高级组件
    handleHighTypeWidget(returnItem) {
      // highType = 0，弹窗 - 取消和确定
      if (returnItem.highType === "0") {
        if (returnItem.children && returnItem.children.length > 1) {
          let arr = returnItem.children[1].children;
          if (arr && arr.length > 1) {
            arr.forEach((item) => {
              // 这里就是添加元素的
              if (item.events && item.events.length > 0) {
                item.events.forEach((itm) => {
                  // 这里一定要保存对象，引用数据类型
                  this.$store.commit("set_selectedWidgetFn", itm);
                });
              }
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
