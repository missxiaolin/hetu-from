<template>
  <el-aside class="el-list bd">
    <div>
      <h1 class="tplLabel">{{ tempKey.label }}</h1>
    </div>
  </el-aside>
</template>

<script>
import vuedraggable from "vuedraggable";
// 组件数据
import { basicList } from "../tool/element/basicList";
export default {
  name: "formLeft",
  components: {
    vuedraggable,
  },
  data() {
    return {
      temElList: {
        e: [
          {
            label: "基础组件",
            list: basicList,
          },
          {
            label: "布局组件",
            list: layoutList,
          },
          {
            label: "高级组件",
            list: highList,
          },
          {
            label: "页面模板",
            list: pageList,
          },
        ],
        h: [],
        react: [
          {
            label: "基础组件",
            list: antBasciList,
          },
        ],
        element: [],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>