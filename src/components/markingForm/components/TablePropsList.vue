
<template>
  <div>
    <template
      v-if="data.children[0].props && data.children[0].props.length > 0"
    >
      <div v-for="(item, index) in data.children[0].props" :key="index">
        <div class="form-box" v-if="item.key === 'columns'">
          <div style="margin: 5px 0; font-weight: 700">
            表头 column：
            <el-button type="primary" size="small" @click="addColumnItem"
              >添加表头元素</el-button
            >
            <span style="margin-left: 20px" class="tips">可拖拽排序</span>
          </div>
          <vuedraggable
            tag="el-row"
            :list="item.default || []"
            v-bind="{ group: 'people', ghostClass: 'ghost' }"
            :ghostClass="'ghost'"
          >
            <el-col
              :span="12"
              class="form-edit-label"
              v-for="(itm, index) in item.default || []"
              :key="index"
            >
              <span>
                <!-- <span class="num">{{index + 1}}</span> -->
                label：
                <el-input
                  style="width: 30%"
                  size="small"
                  v-model="itm.label"
                ></el-input>
              </span>
              <span>
                key：
                <el-input
                  style="width: 30%"
                  size="small"
                  v-model="itm.prop"
                ></el-input>
              </span>
              <el-button
                @click="deleteColumnItem(index)"
                style="margin-left: 10px"
                type="text"
                size="samll"
                >删除</el-button
              >
            </el-col>
          </vuedraggable>
          <div style="border-top: 1px solid #666; margin: 10px 0"></div>
          <div style="font-weight: 700; margin: 10px 0">
            表头数据预览：
            <span class="tips">非数据绑定</span>
          </div>
          <el-input
            type="textarea"
            autosize
            :disabled="true"
            v-model="columnsStr"
          ></el-input>
        </div>
        <div class="form-box" v-if="item.key === 'data'">
          <div style="margin: 10px 0; font-weight: 700">
            表格数据 dataList：
            <span class="tips">可以手动复制数据进行测试</span>
            <el-button
              size="small"
              type="primary"
              style="margin-left: 20px"
              @click="settableData"
              >数据填充确认</el-button
            >
            <el-button
              size="small"
              type="primary"
              style="margin-left: 20px"
              @click="createData"
              >生成模拟数据</el-button
            >
          </div>
          <el-input type="textarea" autosize v-model="dataStr"></el-input>
        </div>
      </div>
    </template>
    <div style="margin: 20px 0; font-size: 22px">表格效果预览</div>
    <eb-table v-bind="tableObj"></eb-table>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import { mapGetters } from "vuex";

export default {
  name: "tablePropsList",
  components: {
    vuedraggable,
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
      columnsStr: "",
      dataStr: "",
      tableObj: {},
    };
  },
  watch: {
    data: {
      handler(val) {
        if (!val) return;
        this.tableProps();
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["selectWidget"]),
  },
  created() {},
  mounted() {
    this.getColumnsStr();
    this.getTableDataStr();
  },
  methods: {
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
      console.log("-", this.data);
      if (this.data.props) {
        let props = this.data.props || [];
        props.forEach((item) => {
          console.log(item);
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
      // 构建表格绑定数据
      this.tableObj = {
        columns: columns,
        data: data,
      };
      // 再次更新表头和表格数据
      this.getColumnsStr();
      this.getTableDataStr();
    },
    // 生成模拟数据 - 根据表头
    createData() {
      let props = this.data.children[0].props || [];
      // 先获取表头数据
      let columns = [];
      let data = [];
      props.forEach((item) => {
        if (item.key === "columns") {
          columns = item.default;
        }
        if (item.key === "data") {
          data = item.default;
        }
      });
      for (let index = 0; index < 10; index++) {
        let obj = {};
        columns.forEach((item) => {
          let text = "我是-- " + item.prop + " --" + "的模拟数据";
          this.$set(obj, item.prop, text);
        });
        this.$set(data, index, obj);
      }
      console.log(data);
      // 根据表头生成数据
      this.tableProps();
    },
    // 添加表头元素
    addColumnItem() {
      let props = this.data.children[0].props || [];
      props.forEach((item) => {
        if (item.key === "columns") {
          item.default.push({
            label: "测试数据" + (item.default.length + 1),
            scope: "test",
            prop: "test",
          });
        }
      });
      this.tableProps();
    },
    deleteColumnItem(index) {
      let props = this.data.children[0].props || [];
      props.forEach((item) => {
        if (item.key === "columns") {
          if (item.default.length < index) return;
          item.default.splice(index, 1);
        }
      });
      this.tableProps();
    },
    getColumnsStr() {
      let ret = "";
      this.data.children[0].props.forEach((item) => {
        if (item.key === "columns") {
          ret = JSON.stringify(item.default);
        }
      });
      this.columnsStr = ret;
    },
    getTableDataStr() {
      let ret = "";
      this.data.children[0].props.forEach((item) => {
        if (item.key === "data") {
          ret = JSON.stringify(item.default);
        }
      });
      this.dataStr = ret;
    },
    // 给表格设置数据 - 反解析 dataStr
    settableData() {
      let data = [];
      try {
        data = JSON.parse(this.dataStr);
      } catch (error) {
        data = [];
      }
      this.data.children[0].props.forEach((item) => {
        if (item.key === "data") {
          item.default = data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-edit-label {
  height: 50px;
  line-height: 50px;
  .num {
    font-weight: 700;
    font-size: 20px;
  }
}
.tips {
  color: #67c23a;
  font-weight: 600;
}
</style>
