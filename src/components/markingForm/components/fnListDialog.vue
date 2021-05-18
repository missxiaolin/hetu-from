<template>
  <el-dialog
    title="添加/修改方法"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :destroy-on-close="true"
  >
    <!-- 选中方法 -->
    <div class="e-row">
      <div class="e-col col-flex">
        <div class="form-label" style="width: 120px"><i>*</i>请选择方法：</div>
        <div class="form-control">
          <el-select
            clearable
            v-model.trim="showFnListModel"
            placeholder="请先选择方法"
            value-key="id"
          >
            <el-option
              v-for="(item, index) in showFnList"
              :key="index"
              :label="item.fn"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="e-col col-flex">
        <div class="form-label" style="width: 120px">是否init调用</div>
        <div class="form-control">
          <el-radio-group v-model="fnInit">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">不是</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="e-row">
      <div class="e-col col-flex">
        <div class="form-label" style="width: 120px"><i>*</i>方法类型：</div>
        <div class="form-control">
          <el-select
            placeholder="请选择方法类型"
            v-model.trim="showType"
            clearable
          >
            <el-option
              v-for="item in showTypeList"
              :key="item.key"
              :label="item.key"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="e-col col-flex">
        <div class="form-label" style="width: 120px"><i>*</i>方法名称：</div>
        <div class="form-control">
          <el-input
            v-model.trim="fnName"
            clearable
            placeholder="请输入方法名称"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="e-row">
      <div class="e-col col-flex">
        <div class="form-label" style="width: 120px">方法参数：</div>
        <div class="form-control">
          <el-input
            v-model.trim="fnParmas"
            placeholder="请输入方法参数(逗号隔开)"
          ></el-input>
        </div>
      </div>
      <div class="e-col col-flex">
        <div class="form-label" style="width: 120px">方法注释：</div>
        <div class="form-control">
          <el-input
            v-model.trim="fnNotes"
            placeholder="请输入方法注释"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="e-row">
      <div class="e-col col-flex">
        <div class="form-label" style="width: 120px">请求方式：</div>
        <div class="form-control">
          <el-select v-model.trim="fnMethod" placeholder="请选择请求方式">
            <el-option
              v-for="item in showMethodList"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <template v-if="(showFnListModel || {}).type === 1">
        <div class="e-col col-flex">
          <div class="form-label" style="width: 120px">网络请求地址：</div>
          <div class="form-control">
            <el-input
              v-model.trim="fnUrl"
              placeholder="请输入方法请求地址"
            ></el-input>
          </div>
        </div>
      </template>
      <template
        v-else-if="
          (showFnListModel || {}).type === 2 ||
          (showFnListModel || {}).type === 3
        "
      >
        <div class="e-col col-flex">
          <div class="form-label" style="width: 120px">路由跳转地址：</div>
          <div class="form-control">
            <el-input
              v-model.trim="fnUrl"
              placeholder="请输入方法跳转地址"
            ></el-input>
          </div>
        </div>
      </template>
    </div>
    <div style="margin: 10px">
      <el-button
        type="primary"
        size="small"
        style="height: 35px; margin-top: 7px"
        @click="previewFunc"
        >预览生成方法</el-button
      >
    </div>
    <!-- 预览方法 ace-build 设置内容api始终未找到合适的调用 -->
    <div id="fneditor" v-if="showAce" style="height: 400px; width: 100%">
      {{ fnTemplate }}
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="aceConfrim">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fnList, typeList, methodList } from "../../tool/fnList.js";

export default {
  props: {
    // 组件数据源
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 选择方法对象
    fnData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      visible: false, // 是否显示
      showFnListModel: undefined, // v-model.trim 方法选中
      showFnList: fnList, // 方法模板列表
      showTypeList: typeList, // 方法类型下拉列表
      showMethodList: methodList,
      showType: "no", // 方法类型 - 前缀
      fnInit: false, // 是否init方法内部
      fnMethod: "get", // 请求方式：get post
      fnName: "", // 方法名称
      fnParmas: "", // 方法参数
      fnUrl: "/", // 方法url
      fnNotes: "", // 方法注释
      showAce: false, // 是否显示ace代码编辑
      fnTemplate: "", // 当前选中的方法template
      status: false, // 标记生成方法状态，必须先生成方法
    };
  },
  created() {},
  mounted() {},
  methods: {
    show(item) {
      this.showAce = false;
      if (!item.body || item.body === "" || item.length <= 0) {
        console.log(item);
        // 数据初始化
        this.showFnListModel = undefined; // v-model.trim 方法选中
        this.showType = "no"; // 方法类型 - 前缀
        this.fnMethod = "get"; // 请求方式：get post
        this.fnName = ""; // 方法名称
        this.fnParmas = ""; // 方法参数
        this.fnUrl = "/"; // 方法url
        this.fnNotes = ""; // 方法注释
        this.showAce = false; // 是否显示ace代码编辑
        this.fnTemplate = ""; // 当前选中的方法template
        this.fnBody = "";
        this.isInit = false;
        this.status = false;
      } else {
        // 数据回显
        this.$nextTick(() => {
          this.fnName = this.fnData.fn || "";
          this.fnNotes = this.fnData.notes || "";
          this.fnParmas = (this.fnData.params || []).join(",");
          this.fnMethod = this.fnData.fnMethod;
          this.fnUrl = this.fnData.fnUrl;
        });
      }
      this.visible = true;
    },
    beforeClose() {
      this.visible = false;
    },
    // 每次调用都更新重新创建-显示选中的方法fn
    previewFunc() {
      this.showAce = false;
      this.fnTemplate = this.formatFunc();
      if (!this.fnTemplate) {
        return;
      }
      this.$nextTick(() => {
        this.showAce = true;
        this.$nextTick(() => {
          // eslint-disable-next-line
          let editor = ace.edit("fneditor");
          editor.$blockScrolling = Infinity;
          editor.setFontSize(16);
          editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
          });
          editor.session.setMode("ace/mode/javascript");
          editor.setTheme("ace/theme/monokai");
        });
      });
    },
    formatFunc() {
      let fnStr = "";
      // 合法验证
      if (!this.showFnListModel) {
        this.$message.error("请先选择方法");
        return;
      }
      let showFnListModel = this.showFnListModel || {};
      let body = showFnListModel.body || "";
      if (!this.showType) {
        this.$message.error("请选择方法类型");
        return;
      }
      if (!this.fnName || this.fnName === "") {
        this.$message.error("请输入方法名称");
        return;
      }
      let start = "";
      // 添加注释
      if (this.fnNotes !== "") {
        start = start + `// ${this.fnNotes}\n`;
      }
      // 方法名称和参数
      start = start + `${this.fnName} (${this.fnParmas}){`;
      // 返回输出
      if (this.showType === "no") {
        // 如果是no，那么就是添加数据返回
        body = body.replace(
          "$$retData$$",
          `this.${this.data.model} = res.model`
        );
      } else {
        body = body.replace("$$retData$$", `console.log(res.model)`);
      }
      // 请求方式method
      body = body.replace("$$method$$", `${this.fnMethod}`);
      // url
      if (this.fnUrl === "/") {
        body = body.replace("$$url$$", `/url`);
        if (showFnListModel.type === 3) {
          body = body.replace("$$url$$", `/url`);
        }
      } else {
        body = body.replace("$$url$$", this.fnUrl);
        if (showFnListModel.type === 3) {
          body = body.replace("$$url$$", this.fnUrl);
        }
      }
      // 参数配置 - type === 2 跳转
      if (showFnListModel.type === 2 || showFnListModel.type === 3) {
        if (this.fnParmas.indexOf(",") !== -1) {
          // 参数包含逗号，多个参数
          let arr = this.fnParmas.split(",");
          let query = "";
          arr.forEach((item) => {
            query = query + `${item}: ${item},`;
          });
          // 第一个参数是key
          body = body.replace("$$key$$", `${arr[0]}`);
          body = body.replace("$$query$$", query);
        } else {
          // 单个参数
          body = body.replace("$$key$$", `${this.fnParmas}`);
          body = body.replace(
            "$$query$$",
            `${this.fnParmas}: ${this.fnParmas}`
          );
        }
      }
      // 组装 - 结尾处理
      fnStr = start + body + "\n}";
      this.fnBody = body;
      this.status = true;
      return fnStr;
    },
    // 确定 - 数据回显
    // TODO: // 后期写个fn-parser以及fngen，对方法进行多功能处理
    aceConfrim() {
      if (!this.status) {
        this.$message.error("请先预览生成方法");
        return;
      }
      // 隐藏组件
      this.visible = false;
      // 方法乐胥
      this.fnData.type = this.showType;
      // 方法body
      this.fnData.body = this.fnBody;
      // 方法是否init
      this.fnData.isInit = this.fnInit;
      // 方法注释
      this.fnData.notes = this.fnNotes;
      // 方法名称
      this.fnData.fn = this.fnName;
      // 请求方法
      this.fnData.fnMethod = this.fnMethod;
      // url
      this.fnData.fnUrl = this.fnUrl;
      // 方法参数 - 变为数组处理
      if (this.fnParmas.indexOf(",") !== -1) {
        // 参数包含逗号，多个参数
        let arr = this.fnParmas.split(",");
        this.fnData.params = arr;
      } else {
        // 单个参数
        this.fnData.params = [this.fnParmas];
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
