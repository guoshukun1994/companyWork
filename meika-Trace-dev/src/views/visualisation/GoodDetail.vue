<template>
  <div class="goodDetailq">
    <div class="content">
      <div class="title"> <img style="vertical-align:middle" src="../../assets/home_type.png" alt="">商品详情</div>
      <div class="goodInfo">
        <div class="avatar">
          <img
            :src="goodDetail.goods_Photo"
          >
        </div>
        <div class="detail">
          <div>
            <span>商品存证</span><span>{{ goodDetail.goods_Hash }}</span><img :src="goodDetail.checkResult==true?successImg:failImg" >
          </div>
          <div>
            <span>商品名称</span><span>{{ goodDetail.goods_Name }}</span>
          </div>
          <div>
            <span>商品售价</span><span>{{ goodDetail.goods_Pric }}</span>
          </div>
          <div>
            <span>商品规格</span><span>{{ goodDetail.goods_Spen }}</span>
          </div>
          <div>
            <span>保质期</span><span>{{ goodDetail.shelf_life }}</span>
          </div>
          <div>
            <span>生产企业</span><span>{{ goodDetail.comp_Name }}</span>
          </div>
        </div>
        <div class="introduce" align='center'>
          {{ goodDetail.goods_Describe }}
        </div>
      </div>
                    <div style="clear:both"></div>

    </div>
    <div class="imgTitle" style="margin-top:20px">商品图片</div>
    <div v-if="goodDetail.goodsPhotoList00 == ''||goodDetail.goodsPhotoList00 == undefined">
      <div style="height:200px;text-align:center;line-height:200px;font-size:30px">
        暂无图片
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col
          v-for="(item, i) in goodDetail.goodsPhotoList00"
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
    <div class="imgTitle">商品说明书</div>
    <div v-if="goodDetail.goodsPhotoList01 == ''||goodDetail.goodsPhotoList01 == undefined">
      <div style="height:200px;text-align:center;line-height:200px;font-size:30px">
        暂无图片
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col
          v-for="(item, i) in goodDetail.goodsPhotoList01"
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
    <div v-if="goodDetail.goodsPhotoList90 == ''||goodDetail.goodsPhotoList90==undefined">
      <div style="height:200px;text-align:center;line-height:200px;font-size:30px">
        暂无图片
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col
          v-for="(item, i) in goodDetail.goodsPhotoList90"
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
  </div>
</template>

<script>
import { getGoodDetail } from '../../api/dataShow'
export default {
    name: 'GoodDetail',
    props: ['goods_ID','checkCode'],
    data() {
        return {
            successImg: require('../../assets/success.png'),
            failImg: require('../../assets/fail.png'),
            goodDetail: {
                checkResult: '',
                comp_Name: '',
                goods_Describe: '',
                goods_Hash: '',
                goods_Name: '',
                goods_Photo: '',
                goods_Pric: '',
                goods_Spen: '',
                goods_lot: '',
                shelf_life: '',
                goodsPhotoList00: [],
                goodsPhotoList01: [],
                goodsPhotoList90: []
            }
        }
    },
    watch: {
        'goods_ID': function () {
            getGoodDetail({ goods_ID: this.goods_ID,checkCode: this.checkCode, }).then(res => {
                this.goodDetail = res
            })
        }
    },
    mounted() {
        getGoodDetail({ goods_ID: this.goods_ID,checkCode: this.checkCode, }).then(res => {
            this.goodDetail = res
        })
    },
}
</script>
<style lang="scss" scoped>
.goodDetailq {
    .content {
        height: 275px;
    }

    .title {
        height: 64px;
        font-size: 22px;
        line-height: 64px;
        color: #5348bd;
        text-align: center;
        font-weight: bold;
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
            // width: 800px;

            div span {
                display: inline-block;
                line-height: 24px;
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
            text-indent: 2em;
            float: left;
            width: 420px;
            margin: 28px 0;
            text-align: left;
            margin-left: 10px;
        }
    }
}
</style>
