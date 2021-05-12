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
      <el-tab-pane label="方法属性" name="form">
        <template v-if="data.key">
          <div>
            <el-button type="primary" @click="addFunc">添加方法</el-button>
          </div>
          <div v-for="(item, index) in selectedWidgetFn" :key="index">
            <!-- 点击出现弹窗，选中方法 template -->
            {{item.body}}
            <el-button @click="seletFnTemplate(item)">{{item.name}} - {{item.fn}}</el-button>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    <fnListDialog ref="fnListDialog" :data="data" :fnData="showFnListSelectItem"></fnListDialog>
    <el-dialog
      title="设置组件pros属性中的props"
      :visible.sync="showWidgetProps"
      :close-on-click-modal="false">
      <eb-table
        v-bind="tableProps"
        selectType="checkbox"
      ></eb-table>
    </el-dialog>
    <el-dialog
      title="设置组件table属性中的props"
      :visible.sync="showTableProps"
      :close-on-click-modal="false"
      width="70%">
      <table-props-list :data="data"></table-props-list>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addDraggerWidget } from '../tool/tool.js'
import fnListDialog from './components/fnListDialog'
import TablePropsList from './components/tablePropsList'

export default {
  name: "formRight",
  components: {
    fnListDialog,
    TablePropsList
  },
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
