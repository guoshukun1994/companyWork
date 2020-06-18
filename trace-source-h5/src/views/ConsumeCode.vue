<template>
  <div class="consumeCode">
    <MyHeader title="消费结果"></MyHeader>
    <div class="gas"></div>
    <Copy :dialogVisible="dialogVisible" :hash="hash" @close="close"></Copy>
    <div class="cousumeDetail">
      <div class="img">
        <div class="content">
          <img
            v-if="status == 0"
            src="@/assets/consumeing.png"
            alt=""
            class="status"
          />
          <img
            v-else-if="status == -1"
            src="@/assets/consumed.png"
            alt=""
            class="status"
          />
          <img
            v-else-if="status == 1"
            src="@/assets/consume-success.png"
            alt=""
            class="status"
          />
          <img
            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1586759669&di=3c75fd65ea6f2ee44f538a70c093544f&src=http://n.sinaimg.cn/spider2020319/183/w672h311/20200319/c761-iqyrykv4695484.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="second-title">消费信息</div>
      <div class="detail">
        <div>出厂存证</div>
        <div class="hash">{{ codeDetail.reg_hash }}</div>
        <img
          src="../assets/bigger.png"
          alt=""
          @click="openDialog(codeDetail.reg_hash)"
        />
      </div>
      <div class="detail">
        <div>存证日期</div>
        <div>{{ codeDetail.reg_Hash_Datetime | timestampToTime }}</div>
      </div>
      <div class="detail">
        <div>消费存证</div>
        <div v-if="codeDetail.consume_Hash" class="hash">
          {{ codeDetail.consume_Hash }}
        </div>
        <div v-else>未被扫码验证</div>
        <!-- <div>{{codeDetail.consume_Hash?codeDetail.consume_Hash:"未被扫码验证"}}</div> -->
        <img
          v-if="codeDetail.consume_Hash ? true : false"
          src="../assets/bigger.png"
          alt=""
          @click="openDialog(codeDetail.consume_Hash)"
        />
      </div>
      <div class="detail">
        <div>消费日期</div>
        <div v-if="codeDetail.consume_Hash_Datetime">
          {{ codeDetail.consume_Hash_Datetime | timestampToTime }}
        </div>
        <div v-else>上链中</div>
      </div>
    </div>

    <div class="gas"></div>
    <div class="goodDetail">
      <div class="jump">
        <div class="second-title">产品详情</div>
        <img src="@/assets/right.png" class="icon" alt="" />
      </div>
      <div class="detail">
        <div>产品存证</div>
        <div class="hash">{{ codeDetail.goods_Hash }}</div>
        <img
          src="../assets/bigger.png"
          alt=""
          @click="openDialog(codeDetail.goods_Hash)"
        />
      </div>
      <div class="detail">
        <div>商品名称</div>
        <div>{{ codeDetail.goods_Name }}</div>
      </div>
      <div class="detail">
        <div>商品售价</div>
        <div>{{ codeDetail.goods_Pric }}</div>
      </div>
      <div class="detail">
        <div>商品规格</div>
        <div>{{ codeDetail.goods_Spen }}</div>
      </div>
      <div class="detail">
        <div>商品描述</div>
        <div>{{ codeDetail.goods_Describe }}</div>
      </div>
      <div class="detail">
        <div>商品备注</div>
        <div>{{ codeDetail.goods_Memo }}</div>
      </div>
      <div class="detail">
        <div>生产企业</div>
        <div>{{ codeDetail.comp_Name }}</div>
      </div>
      <div class="detail">
        <div>批次号码</div>
        <div>{{ codeDetail.goods_lot }}</div>
      </div>
      <div class="detail">
        <div>保质期</div>
        <div>{{ codeDetail.shelf_life }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoods, getCheckHash } from "@/api/api";

// @ is an alias to /src
export default {
  name: "ConsumeCode",
  created() {
    const { code, status } = this.$route.query;
    this.status = status;
    if (code) {
      getGoods({ code }).then(res => {
        this.codeDetail = res.data;
      });
    }
    if (status == "0") {
      this.timer = setInterval(() => {
        if (this.codeDetail.consume_Hash) {
          getCheckHash({ txHash: this.codeDetail.consume_Hash }).then(res => {
            if (res.data) {
              this.codeDetail = res.data;
              const { sign } = res.data;
              if (sign == "1") {
                // 消费成功
                this.status = 1;
                clearInterval(this.timer);
              } else if (sign == "2") {
                this.status = 2;
                clearInterval(this.timer);
              }
            }
          });
        }
      }, 5000);
    }
  },
  computed: {
    consumeStatus() {
      return "@/assets/contentImg.png";
    }
  },
  data() {
    return {
      dialogVisible: false,
      hash: "",
      status: false,
      codeDetail: {
        comp_Name: "",
        comp_relation: "",
        goods_CD: "",
        goods_Describe: "",
        goods_Hash: "",
        goods_ID: "",
        goods_Memo: "",
        goods_Name: "",
        goods_Photo: "",
        goods_Pric: "",
        goods_Spen: "",
        goods_lot: "",
        goods_relation: "",
        reg_Hash_Datetime: "",
        consume_Hash: "",
        reg_hash: "",
        shelf_life: "",
        sign: 0,
        tab: 0,
        txHash: ""
      }
    };
  },
  methods: {
    openDialog(hash) {
      this.dialogVisible = true;
      this.hash = hash;
    },
    close() {
      this.dialogVisible = false;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
@import "../css/index.less";

.consumeCode {
  min-height: 100%;
  background: #f6f6f6;
  .cousumeDetail {
    background: #fff;
    padding-bottom: 10px;
    .img {
      padding: 24px 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .content {
        width: 200px;
        height: 200px;
        position: relative;
      }
      .status {
        position: absolute;
        left: -50px;
        height: 80px;
        width: 80px;
      }
      img {
        width: 200px;
        height: 200px;
      }
    }
  }
  .goodDetail {
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
    .jump {
      display: flex;
      flex-direction: row;
      align-items: center;
      .second-title {
        flex: 1;
      }
      .icon {
        margin-right: 10px;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
