<template>
    <!-- 作为展示区块链相关信息的ui组件 -->
    <div class="infoContainer">
        <div
            class="loadingStyle"
            v-loading="loading"
            v-if="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
        </div>
        <div class="wxToast" v-if="isWxToast">
            <img src="../assets/wxToast.png" alt=""/>
        </div>
        <div class="second-title">{{title}}</div>
        <div class="traContent" v-for="(item,index) in list" :key="index">
            <div>{{Object.keys(item)[0] ? Object.keys(item)[0] : ''}}</div>
            <div :id="highIndex && index === highIndex ? 'blockNumber' : ''" 
                 :class="index === showIndex && inputShow ? 'inputData' : ''" 
                 @click="jump($event,index,showIndex)"
                 >

                {{ item[Object.keys(item)[0]] }}

                <img
                    v-if="indexArr ? isIndex(index) : false"
                    class="copy"
                    src="../assets/copy.png"
                    alt=""
                    :data-clipboard-text="item[Object.keys(item)[0]]"
                    @click="copyContent"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
    name: "firstInfoContainer",
    props: {
        title: String,      //组件标题
        list: Array,        //渲染list
        hash: String,       //哈希值
        highIndex: Number,  //高亮显示行对应的list的下标
        indexArr: Array,    //具有复制功能对应的list的下标
        showIndex: Number,  //行文字过长添加省略号list的下标
        inputShow: Boolean, //行文字过长添加省略号显示的状态控制
        loading: Boolean    //控制当前页面请求数据时的loading效果展示
    },
    data(){
        return {
            isWxToast: false
        }
    },
    methods: {
        copyContent() {
            let clipboard = new Clipboard(".copy");
            clipboard.on("success", (e)=> {
                // this.$message({
                //     center: true,
                //     customClass: "message",
                //     // showClose: true,
                //     message: "复制成功",
                //     duration: 0,
                //     type: "success",
                // });
                this.isWxToast = true
                setTimeout(()=> {
                    this.isWxToast = false;
                },1500)
                // 释放内存
                clipboard.destroy();
            });

            clipboard.on("error", (e)=> {
                // 不支持复制
                // this.$message({
                //     center: true,
                //     customClass: "message",
                //     message: "该浏览器不支持自动复制",
                //     type: "error",
                // });
                // 释放内存
                clipboard.destroy(); 
            });
        },
        jump($event,index,showIndex){
            //子组件的点击触发父组件传递过来的jumpTo方法
            this.$emit('jumpTo',$event,index,showIndex);
        },
        isIndex(index){
            return this.indexArr.includes(index)
        }
    },
}
</script>

<style lang="less">
    .infoContainer {
        background: #FFFFFF;
        padding: 0 0.205rem 0.185rem 0;
        margin-top: 0.1rem;
        .loadingStyle {
            width: 1rem;
            height:1rem;
            position: absolute;
            right: 50%;
            top: 40%;
            transform: translateX(50%);
        }
        .wxToast {
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            left: 50%;
            top: 35%;
            transform: translateX(-50%);
            img {
                width: 100%;
                height: 100%;
            }
        }
        .second-title {
            font-size: 17px;
        }
        .traContent {
            display: flex;
            align-items: flex-start;
            color: #666666;
            padding-left: 0.15rem;
            font-size: 14px;
            min-height: 0.22rem;
            line-height: 0.22rem;
            margin-bottom: 0.04rem;
            .copy {
                width: 0.14rem;
                height: 0.14rem;
            }
            div:nth-child(1) {
                width: 0.70rem;
                display: flex;
                align-items: center;
            }
            div:nth-child(2) {
                flex: 1;
                color: #333333;
                word-break: break-all;
            }
            #blockNumber{
                color: #337ab7;
            }
        }
    }
</style>