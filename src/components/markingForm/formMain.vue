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
      <div v-for="(item, index) in (data.children || [])" :key="index" class="vuedraggableitem">
        <!-- 布局，可以进行嵌套拖拽 -->
        <template v-if="item.layout">
          <form-layout :data="item" :parent="data" :index="index"></form-layout>
        </template>
      </div>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import formLayout from './formLayout'
import formElement from './formElement'

export default {
  name: "formMain",
  components: {
    vuedraggable,
    formLayout,
    formElement
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    handleWidgetAdd() {},
  },
};
</script>

<style lang="scss" scoped>
</style>