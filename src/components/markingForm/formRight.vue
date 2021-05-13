<template>
  <div class="right-box">
    <el-tabs v-model="activeName" :stretch="true" style="padding: 20px">
      <el-tab-pane label="字段属性" name="widget" style="height: 60px">
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
            {{ item.body }}
            <el-button @click="seletFnTemplate(item)"
              >{{ item.name }} - {{ item.fn }}</el-button
            >
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    <fnListDialog
      ref="fnListDialog"
      :data="data"
      :fnData="showFnListSelectItem"
    ></fnListDialog>
    <el-dialog
      title="设置组件pros属性中的props"
      :visible.sync="showWidgetProps"
      :close-on-click-modal="false"
    >
      <eb-table v-bind="tableProps" selectType="checkbox"></eb-table>
    </el-dialog>
    <el-dialog
      title="设置组件table属性中的props"
      :visible.sync="showTableProps"
      :close-on-click-modal="false"
      width="70%"
    >
      <table-props-list :data="data"></table-props-list>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPropsList } from '../tool/propsList.js'
import { addDraggerWidget } from "../tool/tool.js";
import fnListDialog from "./components/fnListDialog";
import TablePropsList from "./components/tablePropsList";

export default {
  name: "formRight",
  components: {
    fnListDialog,
    TablePropsList,
  },
  mixins: [],
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      // 属性控制tab切换：first和second
      activeName: "widget",
      rowCount: 0, // row 行数
      // 中间选中组件，右边展示他们的字段属性
      widgetFormSelect: {}, // 默认是对象
      showFnListSelectItem: {}, // 选中的方法对象
      widgetProps: [], // props列表
      widgetKey: "", // 记录当前选择的
      showWidgetProps: false,
      showTableProps: false, // 显示table列表
    };
  },
  watch: {
    data: {
      handler(val) {
        this.rowCount = val.children.length;
      },
      deep: true,
    },
    // 中间选中的组件数据，传递给下一个组件
    selectWidget: {
      handler(val) {
        this.widgetFormSelect = val;
        // 每次元素变化，就获取一次列表
        if (this.widgetKey !== val.item.key) {
          this.widgetKey = val.item.key;
          this.handlerWidgetSetProps();
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["selectWidget"]),
    ...mapGetters(["selectedWidgetFn"]),
    ...mapGetters(["selectTemplate"]),
    tableProps() {
      // :columns="data.children[0].props.columns" :data="data.children[0].props.dataList"
      let columns = [
        {
          label: "参数",
          prop: "key",
        },
        {
          label: "说明",
          prop: "tetx",
        },
        {
          label: "类型",
          prop: "type",
        },
        {
          label: "可选值",
          prop: "values",
        },
        {
          label: "默认值",
          prop: "default",
          scope: "default",
        },
      ];
      let data = [];
      if (this.data.props) {
        let props = this.data.props || [];
        props.forEach((item) => {
          if (item.key === "props") {
            data = item.children || [];
          }
        });
      }
      if (this.data.children && this.data.children.length > 0) {
        let tabAST = this.data.children[0];
        if (tabAST.props && tabAST.props.length > 0) {
          tabAST.props.forEach((item) => {
            if (item.key === "columns") {
              columns = item.default || [];
            }
            if (item.key === "data") {
              data = item.default || [];
            }
          });
        }
      }
      return {
        columns: columns,
        data: data,
      };
    },
  },
  created() {},
  mounted() {},
  methods: {
    change(val) {
      console.log(val);
    },
    // 添加和删除row下的col数量
    rowChange(currentValue, oldValue) {
      if (currentValue > oldValue) {
        // 增加一个
        let tabCount = this.data.tabCount;
        let col = {
          type: 1,
          tag: "div",
          layout: true,
          className: "eboss-col col-flex",
          label: "col-eboss-col",
          props: [],
        };
        let returnItem = addDraggerWidget(col, tabCount, this.selectTemplate);
        // 给返回数据添加双向绑定
        this.data.children.push(returnItem);
        // this.$set(this.data.children, this.data.children.length -1, returnItem)
      } else {
        // 减少一个
        this.data.children.pop();
      }
    },
    // 删除元素
    handleWidgetDelete() {
      // console.log('删除元素', this.widgetFormSelect)
      // 1. 找到父元素 2. 找到索引
      let parent = this.widgetFormSelect.parent;
      let index = this.widgetFormSelect.index;
      parent.children.splice(index, 1);
      // 3. 删除元素，那么当前选择的元素就么有了，就要清空store中保存的数据
    },
    // 给当前元素添加方法events，给当前元素events添加数据
    addFunc() {
      // 给当前元素的events添加数据
      // 获取选择的元素
      let fnItem = {
        fn: `type_${createHash(8)}`,
        notes: "",
        body: "",
        id: guid(),
      };
      // 添加关联 - 注意这里要区分高阶组件
      this.selectWidget.item.events.push(fnItem);
      this.$store.commit("set_selectedWidgetFn", fnItem);
    },
    // 显示fndialog，关联数据
    seletFnTemplate (item) {
      this.$refs.fnListDialog.show(item)
      this.showFnListSelectItem = item
    },
    // 获取当前元素的props列表
    handlerWidgetSetProps () {
      this.widgetProps = getPropsList(this.data.tag)
    },
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
