<template>
    <div>
        <MyHeader title="区块情况"></MyHeader>
         <FirstInfoContainer title="应用链区块情况"
                            :indexArr="indexArr" 
                            :highIndex="highIndex"
                            :list="applicationBlockList" 
                            :showIndex="showIndex"
                            @jumpTo="jumpTo"
                            >
        </FirstInfoContainer>
        <div class="infoContainer">
            <div class="second-title">应用链交易记录</div>
            <div class="traContent" v-if="!subBlockHashMsgList.Txs.length">
                <div style="width:0;height:0;"></div>
                <div id="blockNumber">无</div>
            </div>
            <div class="traContent" v-for="(item,index) in subBlockHashMsgList.Txs" :key="index">
                <div style="width:0;height:0;"></div>
                <div id="blockNumber" 
                    class="inputData" 
                    @click="toApplicationTra(item)"
                    >
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSubBlockHashMsg, getSubTxHashMsg } from '../api/api';
import { timestampToTime } from '@/utils/index';
export default {
    name: "applicationDetail",
    data(){
        return {
            indexArr: [2],
            highIndex: 3,
            showIndex: 5,
            subBlockHashMsgList: {
                number: "",
                timestamp: "",
                hash: "",
                parentHash: "",
                miner: "",
                extraData: "",
                number: "",
                Txs: "",
            }
        }
    },
    created(){
        const { blockNumber } = this.$route.query;
        getSubBlockHashMsg({subBlockNumber: blockNumber}).then( res => {
            this.subBlockHashMsgList = res.data;
        }).catch((e)=> {
            console.log('查询应用区块情况失败',e);
        })
    },
    watch: {
        "$route.query.blockNumber": function(newVal) {
            getSubBlockHashMsg({ subBlockNumber: newVal }).then( res => {
                this.subBlockHashMsgList = res.data;
            }).catch((e)=> {
                console.log('查询应用区块情况失败',e);
            })
        }
    },
    computed: {
        applicationBlockList(){
            return [
                 {"区块高度": this.subBlockHashMsgList.number },
                 {"出块时间": timestampToTime(this.subBlockHashMsgList.timestamp)},
                 {"区块哈希": this.subBlockHashMsgList.hash },
                 {"父块哈希": this.subBlockHashMsgList.parentHash },
                 {"矿工": this.subBlockHashMsgList.miner },
                 {"附加数据": this.subBlockHashMsgList.extraData },
                 {"交易数据": this.subBlockHashMsgList.Txs.length ? this.subBlockHashMsgList.Txs.length : 0 },
            ]
        }
    },
    methods: {
        //跳转应用链交易情况页面 参数：subTxHash-交易hash
        toApplicationTra(item) {
            this.$router.push({ path: "/applicationTra", query: { subTxHash: item }})
        },
        jumpTo(index){
            if(index === 3)
            this.$router.push({ path: "/applicationDetail", query: { blockNumber: this.subBlockHashMsgList.number - 1 }})
        }
    },
}
</script>
