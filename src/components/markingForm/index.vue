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
        <el-button type="primary" size="medium" @click="clearJson"
          >清空数据</el-button
        >
        <el-button type="primary" size="medium" @click="getJson"
          >复制JSON</el-button
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
    <!-- JSON dialog -->
    <el-dialog
      title="页面Json"
      :visible.sync="getJSONShow"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      width="1200px"
      center
    >
      <div id="jsoneditor" style="height: 400px; width: 100%">
        {{ jsonTemplate }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="json-btn"
          v-clipboard:copy="jsonCopyValue"
          v-clipboard:success="onCopy"
          type="primary"
          >复制JSON</el-button
        >
        <el-button @click="downloadJson">下载文件（json）</el-button>
      </span>
    </el-dialog>
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
      // 弹窗显示JSON数据
      getJSONShow: false,
      // 需要显示的JSON数据
      jsonTemplate: '',
      // 复制的json数据
      jsonCopyValue: '',
    };
  },
  mounted() {},
  methods: {
    // 导入Json
    importJson() {
      this.$message.error("功能开发中");
    },
    // 清空元素列表
    clearJson() {
      // console.log('清空元素')
      this.widgetForm = { ...defaultJson };
    },
    // 点击复制json
    getJson() {
      this.getJSONShow = true;
      this.jsonTemplate = this.widgetForm;
      this.$nextTick(() => {
        // eslint-disable-next-line
        let editor = ace.edit("jsoneditor");
        editor.$blockScrolling = Infinity;
        editor.setFontSize(16);
        editor.session.setMode("ace/mode/json");
        editor.setOptions({
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
        });
        editor.getSession().on("change", function (e) {
          // 内容变化触发方法
          console.log(e);
        });
        editor.setTheme("ace/theme/monokai");
        // 记录要复制的数据，注意：必须转字符串
        this.jsonCopyValue = JSON.stringify(this.widgetForm);
      });
    },
    // 点击复制，触发的方法
    onCopy () {
      this.$message.success('复制成功')
    },
    downloadJson () {
      let data = this.jsonCopyValue
      const filename= 'code.json'
      if(typeof data === 'object'){
        // 将json转化为字符串
        data = JSON.stringify(data, undefined, 4)
      }
      var blob = new Blob([data], {type: 'text/json'}),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      // 模拟下载文件
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>