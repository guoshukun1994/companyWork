<template>
  <div class="subTransaction">
    <MyHeader title="交易情况"></MyHeader>
    <div class="gas"></div>
    <div class="traDetail">
      <div class="second-title">
        应用链交易情况
      </div>
      <div class="traContent">
        <div>交易哈希</div>
        <div>
          {{ hash }}
          <img
            class="copy"
            src="../assets/copy.png"
            alt=""
            @click="copyContent"
            :data-clipboard-text="hash"
          />
        </div>
      </div>
      <div class="traContent">
        <div>区块高度</div>
        <div class="blockHeight" @click="jumpBlock(traDetail.blockNumber)">
          {{ traDetail.blockNumber }}
        </div>
      </div>
      <div class="traContent">
        <div>交易时间</div>
        <div>{{ traDetail.timestamp | timestampToTime }}</div>
      </div>
      <div class="traContent">
        <div>发送者</div>
        <div>
          {{ traDetail.from }}
          <img
            class="copy"
            src="../assets/copy.png"
            alt=""
            @click="copyContent"
            :data-clipboard-text="traDetail.from"
          />
        </div>
      </div>
      <div class="traContent">
        <div>接收者</div>
        <div>
          {{ traDetail.to }}
          <img
            class="copy"
            src="../assets/copy.png"
            alt=""
            @click="copyContent"
            :data-clipboard-text="traDetail.to"
          />
        </div>
      </div>
      <div class="traContent">
        <div>金额</div>
        <div>{{ traDetail.value }} MOAC</div>
      </div>
      <div class="traContent">
        <div>交易状态</div>
        <div>{{ traDetail.status === true ? "成功" : "失败" }}</div>
      </div>
      <div class="traContent">
        <div>附加数据</div>
        <div :class="inputShow ? '' : 'inputData'" @click="changeShow">
          {{ traDetail.input }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTxHashMsg, getSubTxHashMsg } from "@/api/api";
import Clipboard from "clipboard";

// @ is an alias to /src
export default {
  name: "SubTransaction",
  created() {
    const { hash } = this.$route.query;
    getSubTxHashMsg({ subTxHash: hash }).then((res) => {
      console.log(res);
      this.traDetail = res.data;
    });

    this.hash = hash;
  },
  mounted() {},
  data() {
    return {
      hash: "",
      traDetail: {
        blockHash: "",
        blockNumber: "",
        from: "",
        gas: "",
        gasPrice: "",
        hash: "",
        input: "",
        nonce: "",
        status: "",
        timestamp: "",
        to: "",
        value: "",
      },
      inputShow: false,
    };
  },
  methods: {
    copyContent() {
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", (e) => {
        this.$message({
          center: true,
          customClass: "message",
          // showClose: true,
          message: "复制成功",
          type: "success",
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message({
          center: true,
          customClass: "message",
          message: "该浏览器不支持自动复制",
          type: "error",
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    close() {
      this.dialogVisible = false;
    },
    openDialog(hash) {
      this.dialogVisible = true;
      this.hash = hash;
    },
    changeShow() {
      this.inputShow = !this.inputShow;
    },
    jumpBlock(blockNumber) {
      this.$router.push({
        path: "/subBlock",
        query: { blockNumber },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../css/index.less";

.subTransaction {
  .copy {
    width: 14px;
    height: 14px;
  }
  .traDetail {
    background: #fff;
    padding-bottom: 10px;
  }
  // .blockHeight {
  // }
  .traContent {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    line-height: 22px;
    div:nth-child(1) {
      text-align: right;
      width: 80px;
      margin-right: 15px;
      color: #777777;
    }
    div:nth-child(2) {
      flex: 1;
      width: 60px;
      margin-right: 15px;
      color: #777777;
      overflow: hidden;
      word-break: break-all;
      color: #333333;
    }
    div:nth-child(2).blockHeight {
      color: #337ab7;
    }
  }
  .inputData {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
