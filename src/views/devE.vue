<template>
  <div class="root">
    <div class="main-content">
      <!-- 注释：我是根据页面模板拖拽生成的骨架结构，有一层 template 未渲染 -->
      <div class="content-body">
        <div class="e-row">
          <div class="e-col col-flex">
            <label class="form-label" style="width: 120px">请选择环境：</label>
            <div class="form-control">
              <el-select v-model="query.env">
                <el-option
                  v-for="(item, index) in envList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="e-col col-flex"></div>
        </div>
        <!-- 注释：重置和查询按钮 -->
        <div class="e-inquire-button text-center">
          <el-button size="small" @click="resetSearch">重置</el-button>
          <el-button
            size="small"
            type="primary"
            :loading="searchLoading"
            @click="loadConfigList"
            >查询</el-button
          >
          <el-button size="small" type="primary" @click="gitConfigList"
            >Git代码查询</el-button
          >
        </div>
      </div>
      <!-- 注释：表格顶部按钮 - 一般是新建等 -->
      <div class="e-feature-btn">
        <div class="feature-left">
          <span>共计：{{ dataList.length }}个服务</span>
        </div>
        <div class="feature-right"></div>
      </div>
      <!-- 注释：我是封装之后的列表表格 -->
      <section>
        <eb-table
          size="medium"
          :columns="columns"
          :data="dataList"
          :total="totalCount"
          empty-text="暂无查询结果"
          :showPagination="false"
        >
          <!-- 注释：test - slot - scope -->
          <template #links="scope">
            <div v-for="item in scope.row.links" :key="item.value">
              <span>{{ item.label }}：</span>
              <a :href="item.value" target="_blank">{{ item.value }}</a>
            </div>
          </template>
          <template #url="scope">
            <a
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              v-clipboard:copy="scope.row.url"
              >{{ scope.row.url }}</a
            >
          </template>
          <template #status="scope">
            <span v-if="scope.row.status === 0" style="color: #bfbfbf"
              >未验证</span
            >
            <span v-else-if="scope.row.status === 1" style="color: #00a854"
              >访问成功</span
            >
            <span v-else>访问失败</span>
          </template>
          <template #data="scope">
            <span
              >打包日期：{{ scope.row.data.time }} /
              {{ scope.row.data.week }}</span
            >
          </template>
          <!-- 注释：test - 操作 - scope - 一般包含 删除 编辑等 -->
          <template #options="scope">
            <el-button
              size="small"
              type="text"
              @click="loadConfigFile(scope.row)"
              >验证Config</el-button
            >
          </template>
        </eb-table>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      query: {
        env: "",
      },
      envList: [
        {
          label: "q",
          value: "ceshi",
        },
      ],
      micList: [
        {
          label: "中台",
          value: "bfs",
          links: [
            {
              label: "测试",
              value: "ceshi",
            },
          ],
        },
      ], // 微服务列表
      searchLoading: false,
      // 表格表头数据列表,
      columns: [
        {
          label: "服务名称",
          prop: "name",
          width: 200,
        },
        {
          label: "服务三字码",
          prop: "code",
          width: 100,
        },
        {
          label: "config.json",
          prop: "url",
          width: 300,
        },
        {
          label: "config是否可访问",
          prop: "status",
          width: 150,
        },
        {
          label: "config数据",
          prop: "data",
        },
        {
          label: "验证链接",
          prop: "links",
        },
        {
          label: "操作",
          prop: "options",
          width: 200,
        },
      ],
      // 表格显示的数据列表,
      dataList: [],
      totalCount: 0,
    };
  },
  watch: {},
  computed: {},
  created() {
    let that = this;
    window.MIC_SERVER_CONFIG_CALLBACK = function (res) {
      console.log(res);
      that.dataList.forEach((item, index) => {
        if (item.code.toUpperCase() === res.moduleName.toUpperCase()) {
          that.$set(that.dataList[index], "status", 1);
          let data = {};
          if (res.createTimeNum) {
            let date = new Date(res.createTimeNum);
            data.time = date.toLocaleString();
            data.week = that.getWeek(date.getDay());
          }
          that.$set(that.dataList[index], "data", data);
        }
      });
    };
  },
  mounted() {
    this.loadConfigList();
  },
  methods: {
    getWeek(day) {
      let days = "";
      switch (day) {
        case 1:
          days = "星期一";
          break;
        case 2:
          days = "星期二";
          break;
        case 3:
          days = "星期三";
          break;
        case 4:
          days = "星期四";
          break;
        case 5:
          days = "星期五";
          break;
        case 6:
          days = "星期六";
          break;
        case 0:
          days = "星期日";
          break;
      }
      return days;
    },
    // 复制成功 or 失败（提示信息！！！）
    onCopy: function () {
      this.$message.success("复制成功!");
    },
    onError: function () {
      this.$message.error("复制失败!");
    },
    // 重置方法
    resetSearch() {
      this.query = {
        env: "",
      };
    },
    gitConfigList() {
      const env = "";
      // if (!env || env === "" || env.length <= 0) {
      //   this.$message.error("请先选择环境");
      //   return;
      // }
      // 搜索状态
      this.dataList = [];
      this.formatConfigJson(env, true);
    },
    loadConfigList() {
      const env = this.query.env;
      if (!env || env === "" || env.length <= 0) {
        this.$message.error("请先选择环境");
        return;
      }
      // 搜索状态
      this.searchLoading = true;
      this.dataList = [];
      this.formatConfigJson(env);
      this.searchLoading = false;
    },
    // 格式化数据
    formatConfigJson(env, isGit) {
      this.micList.forEach((item, index) => {
        let url = "";
        if (isGit) {
          url = `http://xxxxxxxx/dist/config.json`;
        } else {
          url =
            env +
            item.value +
            "/config.json?callback=MIC_SERVER_CONFIG_CALLBACK&times=" +
            new Date().getTime();
        }
        let links = [];
        if (item.links) {
          item.links.forEach((itm) => {
            links.push({
              label: itm.label,
              value: env + itm.value,
            });
          });
        }
        let row = {
          url: url,
          code: (item.value || "").toUpperCase(),
          name: item.label,
          status: 0,
          links: links,
          data: {},
        };
        this.$set(this.dataList, index, row);
        this.loadConfigFile(row);
      });
    },
    loadConfigFile(row) {
      let script = document.createElement("script");
      script.src = row.url;
      script.id = row.code;
      document.body.append(script);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
