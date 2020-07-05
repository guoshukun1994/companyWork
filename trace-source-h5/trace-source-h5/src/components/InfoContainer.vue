<template>
    <!-- 作为展示区块链相关信息的ui组件 -->
    <div class="infoContainer">
        <div class="second-title">{{title}}</div>
        <div class="traContent" v-for="(item,index) in list" :key="index">
            <div>{{Object.keys(item)[0] ? Object.keys(item)[0] : ''}}</div>
            <div :id="highIndex && index === highIndex ? 'blockNumber' : ''" 
                 :class="index === showIndex ? 'inputData' : ''" 
                 @click="jump(index)"
                 >

                {{ item[Object.keys(item)[0]] ? item[Object.keys(item)[0]] : '无' }}

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
        showIndex: Number, //行文字过长添加省略号显示的状态控制
    },
    methods: {
        copyContent() {
            console.log(99999999);
            let clipboard = new Clipboard(".copy");
            clipboard.on("success", (e)=> {
                this.$message({
                    center: true,
                    customClass: "message",
                //  showClose: true,
                    message: "复制成功",
                    type: "success",
                });
                // 释放内存
                clipboard.destroy();
            });

            clipboard.on("error", (e)=> {
                // 不支持复制
                this.$message({
                    center: true,
                    customClass: "message",
                    message: "该浏览器不支持自动复制",
                    type: "error",
                });
                // 释放内存
                clipboard.destroy(); 
            });
        },
        jump(index){
            //子组件的点击触发父组件传递过来的jumpTo方法
            this.$emit('jumpTo',index);
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
        .second-title {
            font-size: 0.17rem;
        }
        .traContent {
            display: flex;
            align-items: flex-start;
            color: #666666;
            padding-left: 0.15rem;
            font-size: 0.14rem;
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
        .inputData {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
</style>