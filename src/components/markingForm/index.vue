<template>
  <el-container style="background: white">
    <leftElList></leftElList>
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
      </el-header>
      <el-main>
        <!-- 这里是主程序 -->
        <form-main :data="widgetForm"></form-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftElList from "./formLeft";
// 中间主页面
import formMain from './formMain'
export default {
  name: "markingForm",
  components: {
    leftElList,
    formMain
  },
  data() {
    return {
      tempKey: {
        label: "e",
        value: "e",
      },
      tempList: [
        {
          label: 'e + Element-UI',
          value: 'e',
          hidden: false
        },
        {
          label: 'h',
          value: 'h',
          hidden: true
        },
        {
          label: '普通Element-UI',
          value: 'element',
          hidden: true
        },
        {
          label: 'React + Ant Design',
          value: 'react',
          hidden: false
        }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>