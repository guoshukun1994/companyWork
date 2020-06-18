<template>
  <el-main
    v-loading="true"
    element-loading-text="请稍后"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
    >
  </el-main>
</template>

<script>
import { getCodeStatu } from "../api/api";
// @ is an alias to /src
export default {
  name: "Home",
  mounted() {
    if (this.$route.query.code) {
      const code = this.$route.query.code;
      getCodeStatu({ code }).then(res => {
        console.log('code= '+ code)
        console.log(res.data);
        if (res.data === "1") {
          setTimeout(
            () => this.$router.replace({ path: "/checkCode", query: { code } }),
            1000
          );
        } else if (res.data === "2") {
          setTimeout(
            () =>
              this.$router.push({
                path: "/consumeCode",
                query: { code, status: -1 }
              }),
            1000
          ); //"已经消费"
        } else if (res.data === "3") {
          setTimeout(
            () =>
              this.$router.push({
                path: "/consumeCode",
                query: { code, status: 0 }
              }),
            1000
          ); //未消费
        } else {
          setTimeout(
            () =>
              this.$router.push({
                path: "/none",
                query: { code }
              }),
            1000
          ); //未消费
        }
      });
    } else {
      setTimeout(
        () =>
          this.$router.push({
            path: "/none",
            query: { code }
          }),
        1000
      ); //未消费
    }
  },
  data() {
    return {
      codeUrl: ""
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
  .el-main {
     flex: 1;
     color: skyblue;
  }
</style>
