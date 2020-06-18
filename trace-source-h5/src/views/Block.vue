<template>
  <div class="block">
    <MyHeader title="区块详情"></MyHeader>
    <div class="gas"></div>
    <div class="blockDetail">
      <div class="second-title">
        基础链区块情况
      </div>
      <div class="traContent">
        <div>区块高度：</div>
        <div>{{ blockDetail.number }}</div>
      </div>
      <div class="traContent">
        <div>出块时间：</div>
        <div>{{ blockDetail.timestamp | timestampToTime }}</div>
      </div>
      <div class="traContent">
        <div>区块哈希：</div>
        <div>
          {{ blockDetail.hash }}
          <img
            class="copy"
            src="../assets/copy.png"
            alt=""
            @click="copyContent"
            :data-clipboard-text="blockDetail.hash"
          />
        </div>
      </div>
      <div class="traContent">
        <div>父块哈希：</div>
        <div class="blue" @click="jumpBlock(blockDetail.parentHash)">
          {{ blockDetail.parentHash }}
        </div>
      </div>
      <div class="traContent">
        <div>叔伯哈希：</div>
        <div>
          {{ blockDetail.uncles.length ? blockDetail.uncles[0] : "无" }}
        </div>
      </div>
      <div class="traContent">
        <div>矿工：</div>
        <div>{{ blockDetail.miner }}</div>
      </div>
      <div class="traContent">
        <div>难度：</div>
        <div>{{ blockDetail.difficulty }}</div>
      </div>
      <div class="traContent">
        <div>总难度：</div>
        <div>{{ blockDetail.totalDifficulty }}</div>
      </div>
      <div class="traContent">
        <div>燃料上限：</div>
        <div>{{ blockDetail.gasLimit }}</div>
      </div>
      <div class="traContent">
        <div>燃料消耗：</div>
        <div>{{ blockDetail.gasUsed }}</div>
      </div>

      <div class="traContent">
        <div>操作数：</div>
        <div>{{ blockDetail.nonce }}</div>
      </div>
      <div class="traContent">
        <div>附加数据：</div>
        <div :class="inputShow ? 'inputData' : ''" @click="changeShow">
          {{ blockDetail.extraData }}
        </div>
      </div>
      <div class="traContent">
        <div>交易数据：</div>
        <div>
          {{ blockDetail.transactions.length }}
        </div>
      </div>
    </div>
    <div class="gas"></div>
    <div class="record">
      <div class="second-title">
        基础链交易记录
      </div>
      <div class="transaction">
        <div v-for="item in blockDetail.transactions" :key="item.id">
          <span @click="jumpTra(item)"> {{ item }} </span>
          <img
            class="copy"
            src="../assets/copy.png"
            alt=""
            @click="copyContent"
            :data-clipboard-text="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlockHashMsg, getSubBlockHashMsg } from "@/api/api";
import Clipboard from "clipboard";

// @ is an alias to /src
export default {
  name: "Block",
  created() {
    const { blockNumber } = this.$route.query;
    getBlockHashMsg({ blockNumber }).then(res => {
      console.log(res);
      this.blockDetail = res.data;
    });

    // this.hash = hash;
  },
  mounted() {},
  watch: {
    "$route.query.blockNumber": function(newVal) {
      getBlockHashMsg({ blockNumber: newVal }).then(res => {
        console.log(res);
        this.blockDetail = res.data;
      });
    }
  },
  data() {
    return {
      hash: "",
      blockDetail: {
        difficulty: "",
        extraData: "",
        gasLimit: "",
        gasUsed: "",
        hash: "",
        miner: "",
        nonce: "",
        number: "",
        parentHash: "",
        timestamp: "",
        totalDifficulty: "",
        transactions: [],
        uncles: []
      },
      inputShow: false
    };
  },
  methods: {
    copyContent() {
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", e => {
        this.$message({
          center: true,
          customClass: "message",
          // showClose: true,
          message: "复制成功",
          type: "success"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$message({
          center: true,
          customClass: "message",
          message: "该浏览器不支持自动复制",
          type: "error"
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
    jumpBlock(hash) {
      this.$router.push({
        path: "/block",
        query: { blockNumber: hash }
      });
    },
    jumpTra(hash) {
      this.$router.push({
        path: "/transaction",
        query: { hash }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../css/index.less";

.block {
  .blockDetail {
    background: #fff;
    padding-bottom: 10px;
  }
  .copy {
    height: 17px;
    width: 17px;
  }
  // .blockHeight {
  // }
  .traContent {
    display: flex;
    flex-direction: row;
    line-height: 22px;
    font-size: 14px;
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
    div:nth-child(2).blue {
      color: #337ab7;
    }
  }
  .inputData {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .record {
    background: #fff;
    word-break: break-all;
    padding-bottom: 10px;
    .transaction {
      color: #337ab7;
      div {
        padding: 5px 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
