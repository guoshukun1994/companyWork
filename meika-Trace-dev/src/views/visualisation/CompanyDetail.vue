<template>
  <div class="companyDetail">
    <div class="content">
      <div class="title"> <img style="vertical-align:middle" src="../../assets/home_company.png" alt="">企业详情</div>
      <div class="goodInfo">
        <div class="avatar">
          <img
            :src="compDetail.comp_Photo"
          >
        </div>
        <div class="detail">
          <div>
            <span>企业存证</span><span>{{ compDetail.comp_Hash }}</span><img :src="compDetail.checkResult==true?successImg:failImg" alt="">
          </div>
          <div>
            <span>企业名称</span><span>{{ compDetail.comp_Name}}</span>
          </div>
          <div>
            <span>企业简称</span><span>{{ compDetail.comp_Simp_Name}}</span>
          </div>
          <div>
            <span>企业法人</span><span>{{ compDetail.comp_Leader
            }}{{ compDetail.leader_Phone }}</span>
          </div>
          <div>
            <span>联系人</span><span>{{ compDetail.comp_Contact }}</span>
          </div>
          <div>
            <span>企业地址</span><span>{{ compDetail.comp_Address }}</span>
          </div>
          <div>
            <span>经营范围</span><span>{{ compDetail.comp_Buss_Scope }}</span>
          </div>
        </div>
        <div class="introduce">
          {{ compDetail.comp_Describe }}
        </div>
      </div>
    <div style="clear:both"></div>
    </div>
    <div class="imgTitle" style="margin-top:20px">企业图片</div>
    <div v-if="compDetail.companyPhotoList00 == ''||compDetail.companyPhotoList00 == undefined">
      <div style="height:200px;text-align:center;line-height:200px;font-size:30px">
        暂无图片
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col
          v-for="(item, i) in compDetail.companyPhotoList00"
          :key="i"
          :span="8"
        >
          <div align="center">
            <div class="goodImg">
              <img :src="item.photo_Name" alt="">
            </div>
            <div class="hashVer">
              <span>
                图片存证：{{ item.photo_Hash }}
              </span>
              <img
                :src="item.checkResult==true?successImg:failImg"
              >
              </img>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="imgTitle">资质证照</div>
    <div v-if="compDetail.companyPhotoList01 == ''||compDetail.companyPhotoList01 == undefined">
      <div style="height:200px;text-align:center;line-height:200px;font-size:30px">
        暂无图片
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col
          v-for="(item, i) in compDetail.companyPhotoList01"
          :key="i"
          :span="8"
        >
          <div align="center">
            <div class="goodImg">
              <img
                :src="item.photo_Name"
                alt=""
              >
            </div>
            <div class="hashVer">
              <span>
                图片存证：{{ item.photo_Hash }}
              </span>
              <img
                :src="item.checkResult==true?successImg:failImg"
              >
              </img>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="imgTitle">其他</div>
    <div v-if="compDetail.companyPhotoList90 == ''||compDetail.companyPhotoList90 == undefined">
      <div style="height:200px;text-align:center;line-height:200px;font-size:30px">
        暂无图片
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col
          v-for="(item, i) in compDetail.companyPhotoList90"
          :key="i"
          :span="8"
        >
          <div align="center">
            <div class="goodImg">
              <img
                :src="item.photo_Name"
                alt=""
              >
            </div>
            <div class="hashVer">
              <span>
                图片存证：{{ item.photo_Hash }}
              </span>
              <img :src="item.checkResult==true?successImg:failImg">
              </img>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getCompanyDetail } from '../../api/dataShow'
export default {
    name: 'companyDetail',
    props: ['comp_ID','checkCode'],
    data() {
        return {
            successImg: require('../../assets/success.png'),
            failImg: require('../../assets/fail.png'),
            compDetail: {
                comp_Address: "",
                comp_Buss_Scope: "",
                comp_Contact: "",
                comp_Describe: "",
                comp_Hash: "",
                comp_Leader: "",
                comp_Name: "",
                comp_Photo: "",
                comp_Simp_Name: "",
                companyPhotoList00: "",
                companyPhotoList01: "",
                companyPhotoList90: "",
                cont_Phone: "",
                leader_Phone: "",
                checkResult: ""
            }
        }

    },
    mounted() {
        getCompanyDetail({ comp_ID: this.comp_ID,checkCode:this.checkCode}).then(res => {
            this.compDetail = res
        })

    },
    watch: {
        'comp_ID': function () {
            getCompanyDetail({ comp_ID: this.comp_ID,checkCode:this.checkCode}).then(res => {
                this.compDetail = res
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.companyDetail {
    .content {
        min-height: 275px;
    }

    .title {
        height: 64px;
        font-size: 22px;
        line-height: 64px;
        color: #5348bd;
        text-align: center;
        font-weight: bold;
        margin: 0;
    }

    .imgTitle {
        font-size: 18px;
        font-weight: bold;
        color: #1795ff;
        position: relative;
        margin-top: 10px;
    }

    .imgTitle::before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 12px;
        background: #1795ff;
        border-radius: 3px;
        vertical-align: middle;
        margin: 0 10px 0 20px;
    }

    .hashVer span {
        width: 380px;
        font-size: 14px;
        display: inline-block;
        text-align: justify;
        text-justify: newspaper;
        word-break: break-all;
    }

    .hashVer img {
        width: 24px;
        height: 24px;
        margin-left: 5px;
    }

    .goodImg {
        width: 300px;
        height: 150px;
        background: #fcfcfc;

        img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
        }
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
            min-height: 168px;

            div span {
                display: inline-block;
                line-height: 24px;
                font-size: 14px;
            }

            div span:nth-child(1) {
                vertical-align: top;
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
            text-indent: 2em;
            float: left;
            width: 30%;
            margin: 28px 0;
            text-align: left;
            margin-left: 10px;
        }
    }
}
</style>
