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
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";

export default {
  name: "formMain",
  components: {
    vuedraggable,
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