<template>
  <div>
    <el-table
      class="content-body"
      :data="data"
      v-bind="bindProps"
      style="width: 100%"
      v-on="$listeners"
    >
      <!-- 单选和多选 -->
      <el-table-column
        v-if="selectType === 'checkbox' && selectType.length"
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
      <!-- 循环遍历生成表头 -->
      <el-table-column
        v-for="(col, index) in columns"
        :key="index + Math.random()"
        v-bind="col"
      >
        <!-- 头部 -->
        <template slot="header" slot-scope="scope">
          <slot
            :name="`${col.prop || col.scope}_header`"
            :col="col"
            :$index="scope.$index"
            >{{ col.label || "" }}</slot
          >
        </template>
        <!-- body内容 -->
        <template slot-scope="scope">
          <slot
            :name="col.prop || col.scope"
            :row="scope.row"
            :$index="scope.$index"
            >{{ _getColumnLabel(col, scope.row, scope.$index) }}</slot
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="e-row mt20 justify-end" v-if="showPagination">
      <div class="page-scroll">
        <template>
          <el-pagination
            :layout="layout"
            :total="total"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :current-page="currentPage"
            @size-change="_sizeChange"
            @current-change="_currentChange"
          >
          </el-pagination>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ebTable",
  mixins: [],
  components: {},
  props: {
    // 表格数据源
    data: {
      type: Array,
      default: () => [],
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => [],
    },
    // 边框默认：true，适配e风格
    border: {
      type: Boolean,
      default: true,
    },
    // 是否显示分页信息
    showPagination: {
      type: Boolean,
      default: true,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40];
      },
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    selectType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      bindProps: {
        ...this.$attrs,
        ...this._props,
      },
    };
  },
  watch: {},
  computed: {},
  created() {
    // // console.log(this.bindProps)
  },
  mounted() {},
  methods: {
    /**
     * 根据 prop 返回数据，支持 prop 对象属性形式 `person.zhangsan.name`
     * col：表头 columns 的每一项
     * row：data 数据每一项的信息
     * index：每一列的表格对应的索引
     */
    _getColumnLabel(col, row, index) {
      if (col.prop) {
        let value = row[col.prop];
        // 这里要链式处理 prop
        let prop = col.prop.split(".");
        if (prop && prop.length > 1) {
          // 链式属性
          prop.forEach((item) => {
            if (value) {
              value = value[item]; // 循环递归
            }
          });
        }
        // formatter
        if (col.formatter && typeof col.formatter === "function") {
          return col.formatter(row, col, value, index);
        }
        return value;
      } else {
        // 没有 prop 就意味着无法根据 prop key找到属性值，返回 ''
        return "";
      }
    },
    // pagination size-change
    _sizeChange(size) {
      this.$emit("size-change", size);
    },
    // pagination current-change
    _currentChange(current) {
      // 因为table也有 current-change 所以要和pagination做区别
      this.$emit("currentChange", current);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
