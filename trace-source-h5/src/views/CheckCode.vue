<template>
  <div class="checkCode">
    <!-- <MyHeader title="扫码信息"></MyHeader> -->
    <div class="headerTitle">
      <div class="contentTitle">
        扫码信息
      </div>
    </div>
    <div class="base">
      <Copy :dialogVisible="dialogVisible" :hash="hash" @close="close"></Copy>
      <div class="code">
        <!-- <img :src="codeDetail.comp_Logo" alt="" /> -->
        <div style="width: 20%;">
          <el-image style="width:100%; height: 100%" :src="codeDetail.comp_Logo" fit="cover" :lazy="true">
          </el-image>
        </div>
        <div class="info">
          <div class="barCode">溯源码：{{ code }}</div>
          <div class="sts">
            状态：
            <span class="status">{{ codeDetail.consume_Status | getStatus }}
            </span>
          </div>
        </div>
      </div>
      <div class="detail">
        <div>出厂存证</div>
        <!-- <div class="hash" @click="jumpTra(codeDetail.reg_hash)"> -->
        <div class="hash">
          {{ codeDetail.reg_hash }}
        </div>
        <img src="../assets/bigger.png" alt="" @click="openDialog(codeDetail.reg_hash)" />
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
        <div v-else>未被扫码消费</div>
        <!-- <div>{{codeDetail.consume_Hash?codeDetail.consume_Hash:"未被扫码验证"}}</div> -->
        <img v-if="codeDetail.consume_Hash ? true : false" src="../assets/bigger.png" alt="" @click="openDialog(codeDetail.consume_Hash)" />
      </div>
      <div class="detail">
        <div>消费日期</div>
        <div v-if="codeDetail.consume_Hash_Datetime">
          {{ codeDetail.consume_Hash_Datetime | timestampToTime }}
        </div>
        <div v-else>商品未消费，暂无消费日期</div>
      </div>
      <div class="count">
        <div>已累计被扫{{ codeDetail.count }}次</div>
        <div>
          (第一次扫码时间：{{ codeDetail.first_date | timestampToTime }})
        </div>
      </div>
    </div>
    <div class="gas" />
    <div class="content">
      <div class="first-title">商品信息</div>
      <div class="contentImg">
        <img :src="codeDetail.goods_Photo" alt="" />
      </div>
      <div class="second-title">产品详情</div>
      <div class="detail">
        <div>产品存证</div>
        <!-- <div class="hash" @click="jumpSubTra(codeDetail.goods_Hash)"> -->
        <div class="hash">
          {{ codeDetail.goods_Hash }}
        </div>
        <img src="../assets/bigger.png" alt="" />
        <!-- @click="openDialog(codeDetail.goods_Hash)" -->
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
      <div class="second-title">产品追溯档案</div>
      <div class="contentNav">
        <!-- <div @click="jumpGood('00')"> -->
        <div>
          <img src="../assets/contentImg.png" alt="" />
          <p>产品图片</p>
        </div>
        <!-- <div @click="jumpGood('01')"> -->
        <div>
          <img src="../assets/goodExplain.png" alt="" />
          <p>产品说明书</p>
        </div>
        <!-- <div @click="jumpGood('90')"> -->
        <div>
          <img src="../assets/other.png" alt="" />
          <p>其他</p>
        </div>
      </div>
    </div>
    <div class="qr_code">更多详情请识别下方二维码</div>
    <div :class="codeDetail.comp_Public ? 'jumpToOthers' : 'jumpNoPublic'">
      <div  v-if="codeDetail.comp_Public ? true : false" style="width:50%;text-align: center;">
        <!-- <el-image
                  style="width:100%; height: 100%"
                  :src="require('../assets/pub_account.png')"
                  fit="cover"
                  :lazy="true"
                >
                </el-image> -->
        <img :src="codeDetail.comp_Public" style="width: 100px;height: 100px;" alt="公众号二维码" />
        <div class="title">公众号</div>
      </div>
      <div style="width:50%;text-align: center;">
        <!-- <el-image
                  style="width:100%; height: 100%"
                  :src="require('../assets/mini_program.jpeg')"
                  fit="cover"
                  :lazy="true"
                >
              </el-image> -->
        <img src="../assets/mini_program.jpeg" style="width: 100px;height: 100px;" alt="小程序二维码" />
        <div class="title">小程序</div>
      </div>

    </div>
    <div class="gas"></div>
    <div class="content">
      <div class="first-title">企业信息</div>
      <!-- <div class="contentImg"> -->
      <!-- <img :src="codeDetail.comp_Photo" alt="" /> -->
      <div style="width: 100%;text-align: center;">
        <el-image style="width: 70%;height: 100%" :src="codeDetail.comp_Photo" fit="cover" :lazy="true">
        </el-image>
      </div>
      <!-- </div> -->

      <div class="second-title">产品详情</div>
      <div class="detail">
        <div>企业存证</div>
        <!-- <div class="hash" @click="jumpSubTra(codeDetail.comp_Hash)"> -->
        <div class="hash">
          {{ codeDetail.comp_Hash }}
        </div>
        <img src="../assets/bigger.png" alt="" @click="openDialog(codeDetail.comp_Hash)" />
      </div>
      <div class="detail">
        <div>企业名称</div>
        <div>{{ codeDetail.comp_Name }}</div>
      </div>
      <div class="detail">
        <div>企业简称</div>
        <div>{{ codeDetail.comp_Simp_Name }}</div>
      </div>
      <div class="detail">
        <div>法人</div>
        <div>{{ codeDetail.comp_Leader }}</div>
      </div>
      <div class="detail">
        <div>联系人</div>
        <div>{{ codeDetail.comp_Contact }}</div>
      </div>
      <div class="detail">
        <div>企业地址</div>
        <div>{{ codeDetail.comp_Address }}</div>
      </div>
      <div class="detail">
        <div>经营范围</div>
        <div>{{ codeDetail.comp_Buss_Scope }}</div>
      </div>
      <div class="detail">
        <div>企业描述</div>
        <div>{{ codeDetail.comp_Describe }}</div>
      </div>
      <div class="second-title">产品追溯档案</div>
      <div class="contentNav">
        <!-- <div @click="jumpCompany('00')"> -->
        <div>
          <img src="../assets/contentImg.png" alt="" />
          <p>产品图片</p>
        </div>
        <!-- <div @click="jumpCompany('01')"> -->
        <div>
          <img src="../assets/certificate.png" alt="" />
          <p>资质证书</p>
        </div>
        <!-- <div @click="jumpCompany('90')"> -->
        <div>
          <img src="../assets/other.png" alt="" />
          <p>其他</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoods } from "@/api/api";
export default {
    name: "CheckCode",
    components: {
        // Copy
    },
    created() {
        if (this.$route.query.code) {
            this.code = this.$route.query.code;
            getGoods({ code: this.$route.query.code }).then(res => {
                this.codeDetail = res.data;
                // console.log(res);
            });
        }
    },
    mounted() {},
    data() {
        return {
            pub_url: "",
            miniProgram_url: "",
            dialogVisible: false,
            code: "",
            hash: "",
            codeDetail: {
                check_code: "",
                comp_Address: "",
                comp_Buss_Scope: "",
                comp_CD: "",
                comp_Contact: "",
                comp_Describe: "",
                comp_Hash: "",
                comp_ID: "",
                comp_Leader: "",
                comp_Logo: "",
                comp_Public: "",
                comp_Name: "",
                comp_Photo: "",
                comp_Simp_Name: "",
                comp_relation: "",
                consume_Hash: "",
                consume_Hash_Datetime: "",
                consume_Status: "1",
                cont_Phone: "",
                count: "",
                first_date: "",
                goods_CD: "",
                goods_Describe: "",
                goods_Hash: "",
                goods_ID: "",
                goods_Memo: "",
                goods_Name: "",
                goods_Photo: "",
                goods_Pric: "",
                goods_Spen: "",
                goods_lot: "Rr",
                goods_relation: "",
                leader_Phone: "",
                reg_Hash_Datetime: "",
                reg_hash: "",
                shelf_life: "",
            },
        };
    },
    filters: {
        getStatus(status) {
            if (status === "1") {
                return "已上链 已消费";
            } else if (status === "0") {
                return "已上链 未消费";
            } else {
                return "";
            }
        },
    },
    methods: {
        openDialog(hash) {
            this.dialogVisible = true;
            this.hash = hash;
        },
        close() {
            this.dialogVisible = false;
        },
        jumpGood(type) {
            const {
                goods_Name,
                goods_Pric,
                goods_Spen,
                goods_lot,
                comp_Name,
                shelf_life,
                goods_relation,
            } = this.codeDetail;
            this.$router.push({
                path: "/goodDetail",
                query: {
                    goods_relation,
                    type,
                    goods_Name,
                    goods_Pric,
                    goods_Spen,
                    goods_lot,
                    comp_Name,
                    shelf_life,
                },
            });
        },
        jumpCompany(type) {
            const {
                comp_Name,
                comp_Simp_Name,
                comp_Leader,
                comp_Contact,
                comp_Buss_Scope,
                comp_Address,
                comp_relation,
            } = this.codeDetail;
            this.$router.push({
                path: "/companyDetail",
                query: {
                    comp_Name,
                    comp_Simp_Name,
                    comp_Leader,
                    comp_Contact,
                    comp_Buss_Scope,
                    comp_Address,
                    comp_relation,
                    type,
                },
            });
        },
        jumpTra(hash) {
            this.$router.push({ path: "/transaction", query: { hash } }); //title 0 代表主链，1代表子链
        },
        jumpSubTra(hash) {
            this.$router.push({ path: "/subTransaction", query: { hash } }); //title 0 代表主链，1代表子链
        },
    },
};
</script>

<style lang="less" scoped>
@import "../css/index.less";
.checkCode {
    .base {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        background: #fff;
        .code {
            width: 100%;
            padding: 30px 0 20px 20px;
            display: flex;
            flex: 1;
            align-items: center;
            .info {
                margin-left: 15px;
                flex: 1;
                overflow: hidden;
                .barCode {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .sts {
                    margin-left: 14px;
                }
            }

            // img {
            //   margin: 24px 10px 24px 29px;
            //   height: 90px;
            //   width: 90px;
            // }
            .status {
                color: #1fa6bf;
            }
        }

        .count {
            margin: 20px 0 24px 0;
            text-align: center;
            color: #f35631;
        }
    }
    .content {
        background: #fff;
        .contentImg {
            text-align: center;
            img {
                width: 70%;
            }
        }
        .contentExplain {
            word-break: break-all;
            margin: 20px;
        }
        .contentNav {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            font-size: 12px;
            div {
                text-align: center;
                img {
                    height: 45px;
                    width: 45px;
                }
                p {
                    margin-top: 8px;
                    margin-bottom: 15px;
                }
            }
        }
        // mar
    }
}
</style>
<style lang="less">
@import "../css/element.less";
.el-message-box__wrapper {
    .test {
        width: 80%;
        word-break: break-all;
    }
}
</style>
<style lang="less" scoped>
.headerTitle {
    height: 48px;
    background: red;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    background: url(../assets/header.png);
    background-size: 100% 100%;
    .contentTitle {
        text-align: center;
        line-height: 48px;
        flex: 1;
        font-size: 18px;
    }
}
.qr_code {
    padding-top: 10px;
    color: #32312d;
    font-size: 14px;
    text-align: center;
}
.jumpToOthers {
    display: flex;
    padding-top: 10px;
    .title {
        text-align: center;
    }
}
.jumpNoPublic {
    display: flex;
    padding-top: 10px;
    .title {
        text-align: center;
    }
    justify-content: center;
    align-items: center;
}
</style>
