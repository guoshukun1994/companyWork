<template>
  <div class="none">
    <MyHeader title="消费失败"></MyHeader>
    <div class="gas"></div>
    <div class="cousumeDetail">
      <div class="content">
        <img src="@/assets/none.png" alt="" />
        <div>该商品不存在</div>
      </div>
      <div class="second-title">扫码信息</div>
      <div class="detail">
        <div>条码信息</div>
        <div>{{ code }}</div>
      </div>
      <div class="detail">
        <div>失败原因</div>
        <div style="color:#F76260">该商品条码不存在</div>
      </div>
      <div class="detail">
        <div>扫码日期</div>
        <div>{{ time | timestampToTime }}</div>
      </div>
    </div>
    <div class="gas"></div>
    <div class="goodDetail">
      <div class="second-title">商品详情</div>
      <div class="detail">
        <!-- <div>商品名称</div> -->
        <div class="hash" style="text-align: left">无</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "none",
  created() {
    if (this.$route.query.code) {
      this.code = this.$route.query.code;
    }
    this.time = new Date() / 1000;
  },
  data() {
    return {
      code: "",
      time: ""
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../css/index.less";

.none {
  min-height: 100%;
  background: #f6f6f6;
  .cousumeDetail {
    background: #fff;
    padding-bottom: 10px;
    .content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999999;
      //   justify-content: center;
      img {
        width: 157px;
        height: 138px;
      }
    }
  }
  .goodDetail {
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
