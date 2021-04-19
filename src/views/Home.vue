<template>
  <div class="home">
    <MarkingForm></MarkingForm>
  </div>
</template>

<script>
import MarkingForm from "../components/markingForm";

export default {
  name: "Home",
  components: {
    MarkingForm,
  },
};
</script>

<style lang="scss" scoped>
.code {
  text-align: left;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>