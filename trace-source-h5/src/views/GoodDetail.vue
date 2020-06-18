<template>
  <div class="goodDetail">
    <MyHeader :title="title"></MyHeader>
    <div class="gas"></div>
    <div class="info">
      <div class="first-title">产品信息</div>
      <div class="detail">
        <div>商品名称</div>
        <div>{{ comp_Name }}</div>
      </div>
      <div class="detail">
        <div>商品售价</div>
        <div>{{ goods_Pric }}</div>
      </div>
      <div class="detail">
        <div>商品规格</div>
        <div>{{ goods_Spen }}</div>
      </div>
      <div class="detail">
        <div>保质期</div>
        <div>{{ shelf_life }}</div>
      </div>
      <div class="detail">
        <div>批次号码</div>
        <div>{{ goods_lot }}</div>
      </div>
      <div class="detail">
        <div>生产企业</div>
        <div>{{ comp_Name }}</div>
      </div>
    </div>
    <div class="gas"></div>
    <div class="photo">
      <div class="first-title">{{ title }}</div>
      <div class="content" v-for="item in photoList" :key="item.id">
        <div class="img">
          <img :src="item.photo_Name" alt="" />
        </div>
        <div class="hashDetail">
          <div>存证</div>
          <div>{{ item.photo_Hash }}</div>
          <img
            src="../assets/bigger.png"
            alt=""
            @click="openDialog(item.photo_Hash)"
          />
        </div>
      </div>
    </div>
    <Copy :dialogVisible="dialogVisible" :hash="hash" @close="close"></Copy>
  </div>
</template>

<script>
import { getGoodsPhotos } from "@/api/api";

// @ is an alias to /src
export default {
  name: "GoodDetail",
  created() {
    const {
      goods_relation,
      type,
      goods_Name,
      goods_Pric,
      goods_Spen,
      goods_lot,
      comp_Name,
      shelf_life
    } = this.$route.query;
    (this.goods_Name = goods_Name),
      (this.goods_Pric = goods_Pric),
      (this.goods_Spen = goods_Spen),
      (this.goods_lot = goods_lot);
    this.comp_Name = comp_Name;
    this.shelf_life = shelf_life;
    if (type === "00") {
      this.title = "商品图片";
    } else if (type === "01") {
      this.title = "商品说明书";
    } else if (type === "90") {
      this.title = "其他";
    }
    if (goods_relation && type) {
      getGoodsPhotos({ goods_relation, type }).then(res => {
        this.photoList = res.data;
      });
    }
  },
  mounted() {},
  data() {
    return {
      goods_Name: "",
      goods_Pric: "",
      goods_Spen: "",
      goods_lot: "",
      comp_Name: "",
      shelf_life: "",
      title: "",
      photoList: [],
      dialogVisible: false,
      hash: ""
    };
  },
  methods: {
    openCopy() {
      this.dialogVisible = false;
    },
    close() {
      this.dialogVisible = false;
    },
    openDialog(hash) {
      this.dialogVisible = true;
      this.hash = hash;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../css/index.less";

.goodDetail {
  // height: 100%;
  background: #f6f6f6;
  // padding-top: 20px;
  // padding-top: 120px;
  .info {
    background: #fff;
  }
  .photo {
    background: #fff;
    .content {
      padding-bottom: 20px;
      .img {
        img {
          height: 170px;
          width: 170px;
        }
        text-align: center;
      }
    }
  }
}
</style>
