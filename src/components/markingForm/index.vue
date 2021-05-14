<template>
  <el-container style="background: white">
    <leftElList :tempKey="tempKey"></leftElList>
    <el-container class="bd">
      <el-header style="line-height: 60px; border-bottom: 1px solid #ccc">
        <span style="margin: 0 10px">
          <span>请选择模板：</span>
          <el-select v-model="tempKey" style="display: inline-block !important">
            <template v-for="(item, index) in tempList">
              <el-option
                v-if="!item.hidden"
                :key="index"
                :label="item.label"
                :value="item"
              ></el-option>
            </template>
          </el-select>
        </span>
        <el-button type="primary" size="medium" @click="importJson"
          >导入JSON</el-button
        >
      </el-header>
      <el-main>
        <!-- 这里是主程序 -->
        <form-main :data="widgetForm"></form-main>
      </el-main>
    </el-container>
    <el-aside class="bd">
      <form-right :data="widgetFormSelect"></form-right>
    </el-aside>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";

import leftElList from "./formLeft";
// 中间主页面
import formMain from "./formMain";
import { defaultJson } from "../tool/element/default";
// 右边设置属性
import formRight from "./formRight";

export default {
  name: "markingForm",
  components: {
    leftElList,
    formMain,
    formRight,
  },
  computed: {
    ...mapGetters(["selectWidget"]),
  },
  watch: {
    // 中间选中的组件数据，传递给下一个组件
    selectWidget: {
      handler(val) {
        this.widgetFormSelect = val.item;
      },
      deep: true,
    },
    tempKey: {
      handler(val) {
        this.$store.commit("set_selectTemplate", val);
      },
      immediate: true,
    },
  },
  data() {
    return {
      tempKey: {
        label: "e",
        value: "e",
      },
      tempList: [
        {
          label: "e + Element-UI",
          value: "e",
          hidden: false,
        },
        {
          label: "h",
          value: "h",
          hidden: true,
        },
        {
          label: "普通Element-UI",
          value: "element",
          hidden: true,
        },
        {
          label: "React + Ant Design",
          value: "react",
          hidden: false,
        },
      ],
      // 中间拖拽表格数据
      widgetForm: { ...defaultJson },
      widgetFormSelect: {}, // 默认是对象 
    };
  },
  mounted() {},
  methods: {
    // 导入Json
    importJson() {
      this.$message.error("功能开发中");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>