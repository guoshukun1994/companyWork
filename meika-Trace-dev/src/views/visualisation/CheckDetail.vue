<template>
  <div class="checkDetail">
    <div class="title">
      <img
        style="vertical-align:middle"
        src="../../assets/home_tag.png"
        alt
      />标签详情
    </div>
    <div class="goodInfo">
      <div class="avatar">
        <img src="../../assets/@2xlogo.png" />
      </div>
      <div class="detail">
        <div>
          <span>条码</span>
          <span>{{ tagDetail.check_code }}</span>
        </div>
        <div>
          <span>状态</span>
          <span class="status">
            {{
              tagDetail.consume_Status == "1"
                ? "已上链 已消费"
                : "已上链 未消费"
            }}
          </span>
        </div>
        <div>
          <span>出产存证</span>
          <span>{{ tagDetail.reg_hash }}</span>
          <img
            :src="tagDetail.regCheckResult == true ? successImg : failImg"
            alt
          />
        </div>
        <div>
          <span>出产日期</span>
          <span>{{ getTime(tagDetail.reg_Hash_Datetime) }}</span>
        </div>
        <div>
          <span>消费存证</span>
          <span>{{ tagDetail.consume_Hash }}</span>
          <img
            :src="tagDetail.conCheckResult == true ? successImg : failImg"
            alt
          />
        </div>
        <div>
          <span>消费日期</span>
          <span>{{ getTime(tagDetail.consume_Hash_Datetime) }}</span>
        </div>
      </div>
      <div class="introduce" align="center">
        <img
          :src="tagDetail.consume_Status == '1' ? successImg : failImg"
          alt
        />
        <p v-if="tagDetail.consume_Status == '1'" style="color:#1795FF">
          消费成功
        </p>
        <p v-else style="color:#F04136">暂未消费</p>

        <p>已累计被扫{{ tagDetail.count }}次</p>
        <p>
          第一次扫码时间:{{
            tagDetail.first_date == null
              ? "暂未被扫码验证"
              : getTime(tagDetail.first_date)
          }}
        </p>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import { getCheckCodeDetail } from "../../api/dataShow";
import { getTime } from "../../utils/index";

export default {
  name: "checkDetail",
  props: ["checkCode"],
  data() {
    return {
      successImg: require("../../assets/success.png"),
      failImg: require("../../assets/fail.png"),
      tagDetail: {
        check_code: "",
        consume_Hash: "",
        consume_Hash_Datetime: "",
        consume_Status: "",
        count: "",
        first_date: null,
        goods_CD: "",
        goods_Pric: "",
        reg_Hash_Datetime: "",
        reg_hash: ""
      }
    };
  },
  watch: {
    checkCode: function() {
      getCheckCodeDetail({ checkCode: this.checkCode }).then(res => {
        this.tagDetail = res;
      });
    }
  },
  mounted() {
    getCheckCodeDetail({ checkCode: this.checkCode }).then(res => {
      this.tagDetail = res;
    });
  },
  computed: {
    getTime() {
      return function(timestamp) {
        return getTime(timestamp);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.checkDetail {
  .title {
    height: 64px;
    font-size: 22px;
    line-height: 64px;
    color: #5348bd;
    text-align: center;
    font-weight: bold;
  }

  .goodInfo {
    height: 218px;
    color: #000;

    .avatar {
      height: 100%;
      width: 200px;
      float: left;

      img {
        width: 150px;
        height: 150px;
        margin: 34px 40px;
      }
    }

    .detail {
      float: left;
      margin: 28px 0 28px 30px;
      height: 168px;
      width: 50%;

      .status {
        color: #5348bd;
      }

      div span {
        display: inline-block;
        line-height: 26px;
        font-size: 14px;
      }

      div span:nth-child(1) {
        width: 80px;
        text-align: right;
      }

      div span:nth-child(2) {
        width: 515px;
        margin-left: 14px;
      }
      div img {
        height: 24px;
        width: 24px;
        vertical-align: middle;
      }
    }

    .introduce {
      float: left;
      width: 350px;
      margin: 28px 0;
    }
  }
}
</style>
