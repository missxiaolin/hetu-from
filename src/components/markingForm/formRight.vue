<template>
  <div class="right-box">
    <el-tabs v-model="activeName" :stretch="true" style="padding: 20px;">
      <el-tab-pane label="字段属性" name="widget" style="height: 60px;">
        <span>当前选中元素已添加的属性列表props：</span>
        <ul v-if="data.highType === '4'">
          <li
            v-for="(item, index) in data.children[0].props"
            :key="index"
            style="margin: 5px 0"
          >
            <span v-if="item.key === 'v-model'">
              <span style="font-weight: 700">{{ item.key }} : </span>
              <span>{{ data.model }}</span>
            </span>
            <span v-else>
              <span style="font-weight: 700">{{ item.key }} : </span>
              <span>{{ item.value }}</span>
            </span>
          </li>
          <el-button
            style="margin-top: 10px"
            size="small"
            type="primary"
            @click="showTableProps = true"
            >设置 table Props</el-button
          >
        </ul>
        <ul v-else>
          <li
            v-for="(item, index) in data.props"
            :key="index"
            style="margin: 5px 0"
          >
            <span v-if="item.key === 'v-model'">
              <span style="font-weight: 700">{{ item.key }} : </span>
              <span>{{ data.model }}</span>
            </span>
            <span v-else>
              <span style="font-weight: 700">{{ item.key }} : </span>
              <span>{{ item.value }}</span>
            </span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "formRight",
  mixins: [],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      // 属性控制tab切换：first和second
      activeName: 'widget',
      rowCount: 0, // row 行数
      // 中间选中组件，右边展示他们的字段属性
      widgetFormSelect: {}, // 默认是对象
      showFnListSelectItem: {}, // 选中的方法对象
      widgetProps: [], // props列表
      widgetKey: '', // 记录当前选择的
      showWidgetProps: false,
      showTableProps: false // 显示table列表
    }
  },
};
</script>

<style lang="scss" scoped>
.propItem {
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin-bottom: 10px;
}
.right-box {
  height: 100vh;
  overflow-y: auto;
}
</style>
