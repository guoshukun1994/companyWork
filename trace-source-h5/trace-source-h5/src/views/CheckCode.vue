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
        <div style="width: 20%;">
          <el-image style="width:100%; height: 100%" :src="codeDetail.comp_Logo" fit="cover" :lazy="true" />
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
        <div class="hash" @click="toBaseChainInfo">
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
      <div class="second-title">商品详情</div>
      <div class="detail">
        <div>商品存证</div>
        <div class="hash" @click="toApplicationTra(codeDetail.goods_Hash)">
          {{ codeDetail.goods_Hash }}
        </div>
        <img src="../assets/bigger.png" alt=""  @click="openDialog(codeDetail.goods_Hash)"/>
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
      <div class="second-title">商品溯源档案</div>
      <div class="contentNav" @click="toProInfoPage">
        <div id="proInfo">
          <img src="../assets/contentImg.png" alt="" />
          <p>商品图片</p>
        </div>
        <div id="proInstro">
          <img src="../assets/goodExplain.png" alt="" />
          <p>商品说明书</p>
        </div>
        <div id="proOther">
          <img src="../assets/other.png" alt="" />
          <p>其他</p>
        </div>
      </div>
    </div>
    <!-- <div class="wx_share">
        <el-button type="primary" @click="getAccess">分享</el-button>
    </div> -->
    <div class="qr_code">更多详情请识别下方二维码</div>
    <div :class="codeDetail.comp_Public ? 'jumpToOthers' : 'jumpNoPublic'">
        <div v-if="codeDetail.comp_Public ? true : false">
            <img :src="codeDetail.comp_Public" class="moreImg" alt="公众号二维码" />
            <div class="title">公众号</div>
        </div>
        <div>
            <img src="../assets/mini_program.jpeg" class="moreImg" alt="小程序二维码" />
            <div class="title">小程序</div>
        </div>
    </div>
    <div class="gas"></div>
    <div class="content">
      <div class="first-title">企业信息</div>
      <div class="contentImg">
        <img :src="codeDetail.comp_Photo" alt="" />
      </div>
      <div class="second-title">企业详情</div>
      <div class="detail">
        <div>企业存证</div>
        <div class="hash" @click="toApplicationTra(codeDetail.comp_Hash)">
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
      <div class="second-title">企业追溯档案</div>
      <div class="contentNav" @click="toCompInfoPage">
        <div id="compImg">
          <img src="../assets/contentImg.png" alt="" />
          <p>企业图片</p>
        </div>
        <div id="compCert">
          <img src="../assets/certificate.png" alt="" />
          <p>资质证照</p>
        </div>
        <div id="compOther">
          <img src="../assets/other.png" alt="" />
          <p>其他</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoods,getAccessToken } from "@/api/api";
export default {
    name: "CheckCode",
    created() {

        //在页面加载时读取sessionStorage里的状态信息
        if(sessionStorage.getItem("storedata") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("storedata"))));
        }
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
        });
        // 兼容iphone手机
        window.addEventListener("pagehide",()=>{
        sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
        });
        this.codeDetail = this.$store.state.app.codeDetailList.list;
        console.log('compPhoto',this.codeDetail.comp_Photo);
        
    },
    mounted() {
        this.proDetailList;
        this.compDetailList;
    },
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
    computed: {
        proDetailList(){

            let proDetailList = [
                 { title: "商品名称", value: this.codeDetail.goods_Name },
                 { title: "商品售价", value: this.codeDetail.goods_Pric },
                 { title: "商品规格", value: this.codeDetail.goods_Spen },
                 { title: "商品描述", value: this.codeDetail.goods_Describe },
                 { title: "商品备注", value: this.codeDetail.goods_Memo },
                 { title: "生产企业", value: this.codeDetail.comp_Name },
                 { title: "批次号码", value: this.codeDetail.goods_lot }
            ];
            console.log('-----proDetailList');
            
            this.$store.commit({
                type: 'app/toProDetail',
                list: proDetailList
            })

            return  proDetailList;
        },
        compDetailList(){

            let compDetailList = [
                 { title: "企业名称", value: this.codeDetail.comp_Name },
                 { title: "企业简称", value: this.codeDetail.comp_Simp_Name },
                 { title: "法人", value: this.codeDetail.comp_Leader },
                 { title: "企业地址", value: this.codeDetail.comp_Address },
                 { title: "经营范围", value: this.codeDetail.comp_Buss_Scope },
                 { title: "企业描述", value: this.codeDetail.comp_Describe },
            ];

            console.log('-----compDetailList');
            
            this.$store.commit({
                type: 'app/toCompDetail',
                list: compDetailList
            })

            return  compDetailList;
        }
    },
    methods: {
        getAccess: function(){
            getAccessToken().then(res => {
                console.log('res+++++++');
                console.log(res);
            })
        },
        openDialog(hash) {
            this.dialogVisible = true;
            this.hash = hash;
        },
        close() {
            this.dialogVisible = false;
        },
        //跳转至基础链交易情况页面
        toBaseChainInfo() {
            this.$router.push({ path: "/baseChainInfo", query: { txHash: this.codeDetail.reg_hash }});
        },
        //跳转至应用链交易情况页面
        toApplicationTra(hash) {
            this.$router.push({ path: "/applicationTra", query: { subTxHash: hash }});
        },
        toProInfoPage(e) {
            let type = "";
            let title = "";
            let id = e.target.parentNode.id;
            console.log('id',id);
            
            if( id === "proInfo" ){       //跳转至商品图片信息页面  
              type = "00";
              title = "商品图片";
            }else if( id === "proInstro"){ //跳转至商品说明书页面
              type = "01";
              title = "商品说明书";
            }else if(id === "proOther"){   //跳转至商品其他页面
              type = "90";
              title = "其他";
            }
            this.$router.push({ path: "/proInfoPage", query: { type, title }})
        },
        toCompInfoPage(e) {
            let type = "";
            let title = "";
            let id = e.target.parentNode.id;
            console.log('id',id);
            
            if( id === "compImg" ){       //跳转至企业图片信息页面  
              type = "00";
              title = "企业图片";
            }else if( id === "compCert"){ //跳转至企业资质证照页面
              type = "01";
              title = "资质证照";
            }else if(id === "compOther"){   //跳转至企业其他页面
              type = "90";
              title = "其他";
            }
            this.$router.push({ path: "/compInfoPage", query: { type, title }})
        },
    },
};
</script>

<style lang="less" scoped>
.checkCode {
    min-height: 100vh;
    .base {
        display: flex;
        flex-direction: column;
        font-size: 0.14rem;
        background: #fff;
        .code {
            width: 100%;
            padding: 0.3rem 0 0.2rem 0.2rem;
            display: flex;
            flex: 1;
            align-items: center;
            .info {
                margin-left: 0.15rem;
                flex: 1;
                overflow: hidden;
                .barCode {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .sts {
                    margin-left: 0.14rem;
                }
            }
            .status {
                color: #1fa6bf;
            }
        }

        .count {
            margin: 0.2rem 0 0.24rem 0;
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
            margin: 0.2rem;
        }
        .contentNav {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            font-size: 0.12rem;
            div {
                text-align: center;
                img {
                    height: 0.45rem;
                    width: 0.45rem;
                }
                p {
                    margin-top: 0.08rem;
                    margin-bottom: 0.15rem;
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
    height: 0.48rem;
    background: red;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    background: url(../assets/header.png);
    background-size: 100% 100%;
    .contentTitle {
        text-align: center;
        line-height: 0.48rem;
        flex: 1;
        font-size: 0.18rem;
    }
}
.qr_code {
    padding-top: 0.1rem;
    color: #32312d;
    font-size: 0.14rem;
    text-align: center;
}
.jumpToOthers {
    display: flex;
    padding-top: 0.1rem;
    .title {
        text-align: center;
    }
}
.jumpNoPublic {
    display: flex;
    padding-top: 0.1rem;
    .title {
        text-align: center;
    }
    justify-content: center;
    align-items: center;
}
.moreImg {
    width: 1rem;
    height: 1rem;
}
</style>
