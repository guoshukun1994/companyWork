<template>
  <div class="hello">
    <el-dialog :visible.sync="dialogVisible" width="80%" :show-close="false">
      <span>{{ hash }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button
          type="primary"
          @click="close"
          :data-clipboard-text="hash"
          class="btn"
          >复 制
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    dialogVisible: Boolean,
    hash: String
  },
  mounted() {
    this.clipboard = new this.ClipboardJS(".btn");
    this.clipboard.on("success", e => {
      this.$message({
        center: true,
        customClass: "message",
        // showClose: true,
        message: "复制成功",
        type: "success"
      });
      e.clearSelection();
    });
    this.clipboard.on("error", e => {
      this.$message({
        center: true,
        customClass: "message",
        message: "该浏览器不支持自动复制",
        type: "error"
      });
      // 释放内存
    });
  },
  methods: {
    close() {
      this.$emit("close", false);
    }
  },
  destroyed() {
    console.log(111);

    this.clipboard.destroy();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.message {
  min-width: 200px;
}
</style>
