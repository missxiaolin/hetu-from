<template>
  <div class="root">
    <div class="main-content">
      <label class="form-label">我是input</label>
      <div class="form-control">
        <el-input
          v-model="el_input_oc2enhxxftgo0r0klo"
          @click="type_4yirndyo"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      el_input_oc2enhxxftgo0r0klo: "",
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    // 页面缓存
    this.$store.dispatch("getCache").then((res) => {
      if (res.success) {
        Object.assign(this.$data, res.model);
        if (res.refresh) {
          this.init();
        }
      } else {
        this.init();
      }
    });
  },
  methods: {
    init() {
      this.type_4yirndyo;
    },
    // zhushi
    type_4yirndyo() {
      let params = {};
      this.axiosPost("/dizhi", params)
        .then((res) => {
          if (res.success) {
            console.log(res.model);
          } else {
            this.$alert(res.errorMessage, "提示", { showClose: false });
          }
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
