<template>
  <div class="page-changelog">
    <change-log></change-log>
  </div>
</template>

<script>
import ChangeLog from "../../../CHANGELOG.zh-CN.md";

export default {
  name: "changelog",
  components: {
    ChangeLog,
  },
  mounted() {
    // const changeLog = this.$refs.changeLog;
    // const changeLogNodes = changeLog.$el.children;
  },
};
</script>

<style scoped lang="scss">
</style>