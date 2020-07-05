<template>
    <div class="showContainer">
        <div class="topContent">
            <div class="first-title">{{ title1 }}</div>
            <div class="showDetail" v-for="(item,index) in list" :key="index">
                <div>{{ item.title }}</div>
                <div :class="highIndex && index === highIndex ? 'highRed' : ''">{{ item.value }}</div>
            </div>
        </div>

        <div class="botContent">
            <div class="first-title">{{ title2 }}</div>
            <Copy :dialogVisible="dialogVisible" :hash="hash" @close="close"></Copy>
            <div class="photoList" v-for="(item) in photoList" :key="item.photo_Hash">
                <img :src="item.photo_Name" class="proImg" alt= "商品图片" /> 
            </div>
            <div class="photoList" v-for="(item) in photoList" :key="item.photo_Name">
                <div class="txt-copy">
                    <div class="highTxt" @click="toApplicationTra(item.photo_Hash)">{{ item.photo_Hash }}</div>
                    <img src="../assets/bigger.png" alt="" @click="openDialog(item.photo_Hash)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "showContainer",
    data(){
        return {
            dialogVisible: false,
            hash: "",
            list: []
        }
    },
    props: {
        title1: String,
        title2: String,
        highIndex: Number,
        photoList: Array
    },
    created() {
        if(this.title1 === "商品信息"){
            this.list = this.$store.state.app.proDetailList.list;
        }else if(this.title1 === "企业信息"){
            this.list = this.$store.state.app.compDetailList.list;
        }
    },
    methods: {
        openDialog(hash) {
            this.dialogVisible = true;
            this.hash = hash;
        },
        close() {
            this.dialogVisible = false;
        },
        //跳转至应用链交易情况页面
        toApplicationTra(hash) {
            this.$router.push({ path: "/applicationTra", query: { subTxHash: hash }});
        }
    },
}
</script>

<style lang="less" scoped>
    .showDetail {
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: 0.24rem;
        font-size: 0.14rem;
        padding-right: 0.145rem;
        .highRed {
            color: #F35631 !important;
        }
        div:nth-child(1) {
            text-align: right;
            width: 0.6rem;
            margin: 0 0.15rem;
            color: #777777;
        }
        div:nth-child(2) {
            flex: 1;
            color: #32312d;
        }
    }

    .showContainer {
        background: white;
        .topContent {
            margin-top: 0.1rem;
            padding-bottom: 0.17rem;
            border-bottom: 0.1rem solid #f6f6f6;
        }
        .botContent {
            padding-bottom: 0.22rem;
        }
        .photoList {
            display: flex;
            flex-direction: column;
            align-items: center;
            .proImg{
                width: 80%;
                margin-bottom: 0.1rem;
            }
            
            .txt-copy {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 88%;
                padding: 0 0.15rem 0 0.14rem;
                margin-bottom: 0.05rem;
                font-size: 0.14rem;
                .highTxt{
                    color: #337AB7;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .highTxt + img {
                    width: 0.18rem;
                    height: 0.18rem;
                }
            }
            
        }
    }
    
</style>