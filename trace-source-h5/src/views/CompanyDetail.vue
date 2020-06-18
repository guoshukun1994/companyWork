<template>
  <div class="companyDetail">
    <MyHeader :title="title"></MyHeader>
    <div class="gas"></div>
    <div class="info">
      <div class="first-title">企业信息</div>
      <div class="detail">
        <div>企业名称</div>
        <div>{{ comp_Name }}</div>
      </div>
      <div class="detail">
        <div>企业简称</div>
        <div>{{ comp_Simp_Name }}</div>
      </div>
      <div class="detail">
        <div>法人</div>
        <div>{{ comp_Leader }}</div>
      </div>
      <div class="detail">
        <div>联系人</div>
        <div>{{ comp_Contact }}</div>
      </div>
      <div class="detail">
        <div>企业地址</div>
        <div>{{ comp_Address }}</div>
      </div>
      <div class="detail">
        <div>经营范围</div>
        <div>{{ comp_Buss_Scope }}</div>
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
import { getCompanyPhotos } from "@/api/api";

// @ is an alias to /src
export default {
  name: "CompanyDetail",
  created() {
    const {
      comp_Name,
      comp_Simp_Name,
      comp_Leader,
      comp_Contact,
      comp_Buss_Scope,
      comp_Address,
      comp_relation,
      type
    } = this.$route.query;
    (this.comp_Name = comp_Name),
      (this.comp_Simp_Name = comp_Simp_Name),
      (this.comp_Leader = comp_Leader),
      (this.comp_Contact = comp_Contact);
    (this.comp_Address = comp_Address),
      (this.comp_relation = comp_relation),
      (this.comp_Buss_Scope = comp_Buss_Scope);
    if (type === "00") {
      this.title = "企业资料";
    } else if (type === "01") {
      this.title = "资质证照";
    } else if (type === "90") {
      this.title = "其他";
    }
    if (comp_relation && type) {
      getCompanyPhotos({ comp_relation, type }).then(res => {
        this.photoList = res.data;
      });
    }
  },
  mounted() {},
  data() {
    return {
      comp_Name: "",
      comp_Simp_Name: "",
      comp_Leader: "",
      comp_Contact: "",
      comp_Name: "",
      comp_Buss_Scope: "",
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

.companyDetail {
  height: 100%;
  background: #f6f6f6;
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
