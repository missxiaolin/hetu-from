<template>
  <!-- 我是layout组件，我可以继续拖拽{{data}} -->
  <div
    @click.prevent.stop="handleSelectWidget"
    :class="{ selected: selectKey === selectWidget.item.key }"
  >
    <!-- 弹窗dialog -->
    <template v-if="data.highType === '0'">
      <div class="dialog-info">dialog无法预览，直接查看生成代码即可</div>
    </template>
    <!-- 重置和搜索 -->
    <template v-if="data.highType === '1'">
      <reset-search-btns></reset-search-btns>
    </template>
    <!-- 取消和保存 -->
    <template v-if="data.highType === '2'">
      <cancel-save-btns></cancel-save-btns>
    </template>
    <!-- 表格顶部按钮 -->
    <template v-if="data.highType === '3'">
      <table-header-btn></table-header-btn>
    </template>
    <!-- eb-table -->
    <template v-if="data.highType === '4'">
      <eb-table v-bind="tableProps"></eb-table>
    </template>
    <!-- 返回列表 -->
    <template v-if="data.highType === '5'">
      <back-to-list></back-to-list>
    </template>
    <template v-if="data.highType === '6'">
      <body-header></body-header>
    </template>
    <!-- element-ui 组件列表 -->
    <!-- 基础组件 input -->
    <template v-if="data.tag === 'el-input'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-input v-bind="propsList" v-model="data.model"></el-input>
      </div>
    </template>
    <!-- 基础组件 input-number -->
    <template v-if="data.tag === 'el-input-number'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-input-number
          v-bind="propsList"
          v-model="data.model"
        ></el-input-number>
      </div>
    </template>
    <!-- 基础组件 - button -->
    <template v-if="data.tag === 'el-button'">
      <el-button v-bind="propsList">{{ data.text }}</el-button>
    </template>
    <!-- 基础组件 select -->
    <template v-if="data.tag === 'el-select'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-select v-model="data.model" v-bind="propsList">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </div>
    </template>
    <!-- 基础组件 cascader -->
    <template v-if="data.tag === 'el-cascader'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-cascader v-model="data.model" v-bind="propsList" :options="[]">
        </el-cascader>
      </div>
    </template>
    <!-- 基础组件 日期选择器-->
    <template v-if="data.tag === 'el-date-picker'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-date-picker v-model="data.defaultValue" v-bind="propsList">
        </el-date-picker>
      </div>
    </template>
    <!-- 基础组件 单选框组 -->
    <template v-if="data.tag === 'el-radio-group'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-radio-group v-bind="propsList">
          <el-radio
            v-for="(item, index) in data.children"
            :key="index"
            :label="item.props[0].label"
            >{{ item.prop }}</el-radio
          >
        </el-radio-group>
      </div>
    </template>
    <template v-if="data.tag === 'el-checkbox-group'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-checkbox-group v-bind="propsList">
          <el-checkbox
            v-for="(item, index) in data.children"
            :key="index"
            :label="item.props[0].label"
            >{{ item.prop }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </template>
    <template v-if="data.tag === 'el-switch'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-switch v-bind="propsList"> </el-switch>
      </div>
    </template>
    <template v-if="data.tag === 'el-color-picker'">
      <label for class="form-label" style="width: 105px">{{
        data.label
      }}</label>
      <div class="form-control">
        <el-color-picker v-bind="propsList"> </el-color-picker>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "formElement",
  components: {},
  props: {
    data: {
      type: Object,
    },
    parent: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      selectKey: "",
      propsList: {},
    };
  },
  watch: {
    "data.props": {
      handler(value) {
        let props = {};
        value = value || [];
        value.forEach((item) => {
          // isData：是否放到data中
          // if (!item.isData) {
          props[item.key] = item.value === "{}" ? {} : item.value;
          // }
        });
        this.propsList = props;
      },
      deep: true,
      immediate: false,
    },
    "data.key": {
      handler(value) {
        this.selectKey = value;
      },
    },
  },
  computed: {
    ...mapGetters(["selectWidget"]),
    // 处理table的props
    tableProps() {
      // :columns="data.children[0].props.columns" :data="data.children[0].props.dataList"
      let columns,
        data = [];
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
    // 选中元素
    handleSelectWidget() {
      // console.log('element', this.data, this.data.key)
      // 选择的元素变化了，那就先清空 selectedWidgetFn
      if (this.selectWidget.item.key !== this.selectKey) {
        this.$store.commit("clear_selectedWidgetFn");
      }
      if (this.data.highType && this.data.highType !== "") {
        this.handleHighTypeWidget();
      } else {
        // 普通元素添加events
        this.data.events.forEach((itm) => {
          // 这里一定要保存对象，引用数据类型
          this.$store.commit("set_selectedWidgetFn", itm);
        });
      }
      this.$store.commit("set_selectWidget", {
        item: this.data,
        parent: this.parent,
        index: this.index,
      });
    },
    // 处理高级组件
    handleHighTypeWidget() {
      // highType = 0，弹窗 - 取消和确定
      if (this.data.highType === "0") {
        if (this.data.children && this.data.children.length > 1) {
          let arr = this.data.children[1].children;
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
.selected {
  border: 1px solid red;
}
</style>
