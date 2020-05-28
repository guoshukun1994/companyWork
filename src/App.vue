<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function(e) {
      // async function logout() {
      //   console.log(111111111111111111111111111111111111111)
      //   await this.$store.dispatch("user/logout")
      //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      // }
      var storage = window.localStorage
      storage.clear()
    }
  }
}
</script>
<style lang="scss">
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
