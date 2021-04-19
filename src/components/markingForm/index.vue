<template>
  <el-container style="background: white">
    <leftElList></leftElList>
    <el-container class="bd"> </el-container>
  </el-container>
</template>

<script>
import leftElList from "./formLeft";
export default {
  name: "markingForm",
  data() {
    return {
      tempKey: {
        label: "ebs",
        value: "ebs",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>