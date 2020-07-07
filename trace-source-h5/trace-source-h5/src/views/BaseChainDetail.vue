<template>
    <div class="baseChainDetail">
        <MyHeader title="区块情况"></MyHeader>
        <div style="width:100%;height: 0.1rem;background: #F6F6F6;"></div>
         <FirstInfoContainer title="基础链区块情况"
                            :indexArr="indexArr" 
                            :highIndex="highIndex"
                            :list="blockDetailList" 
                            :inputShow="inputShow"
                            @jumpTo="jumpTo"
                            :loading="loading"
                            >
        </FirstInfoContainer>
        <div style="width:100%;height: 0.1rem;background: #F6F6F6;"></div>
        <div class="infoContainer">
            <div class="second-title">基础链交易记录</div>
            <div class="traContent" v-for="(item,index) in transactionsList" :key="index">
                <div style="width:0;height:0;"></div>
                <div id="blockNumber" 
                    class="inputData" 
                    @click="toBaseChainInfo(item)"
                    >
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBlockHashMsg } from '../api/api';
import { timestampToTime } from '@/utils/index';
import { transform } from '@/utils/transform';

export default {
    name: "baseChainDetail",
    data(){
        return {
            indexArr: [],
            highIndex: 3,
            inputShow: true,
            transactionsList: [],
            loading: true,
            blockHashMsgList: {
                number: "",
                timestamp: "",
                hash: "",
                parentHash: "",
                uncles: "",
                miner: "",
                difficulty: "",
                totalDifficulty: "",
                gasLimit: "",
                gasUsed: "",
                nonce: "",
                extraData: "",
                transactions: "",
            }
        }
    },
    created(){
        const { blockNumber}  = this.$route.query;
        console.log(blockNumber);
        getBlockHashMsg({blockNumber}).then((res)=> {

             this.blockHashMsgList = res.data;
             this.transactionsList = res.data.transactions;

             let jsonObj = res.data;
             this.blockHashMsgList = transform(jsonObj);

             this.loading = false;      //让loading框隐藏
        }).catch((e)=> {
             console.log('查询基础链区块情况失败',e);
        })
    },
    watch: {
        "$route.query.blockNumber": function(newVal) {
            getBlockHashMsg({ blockNumber: newVal }).then(res => {

                this.transactionsList = res.data.transactions;
                let transformJson = {};

                let jsonObj = res.data;
                this.blockHashMsgList = transform(jsonObj);

                this.loading = false;      //让loading框隐藏
            });
        }
    },
    computed: {
        blockDetailList(){
            return [
                 {"区块高度": this.blockHashMsgList.number },
                 {"出块时间": timestampToTime(this.blockHashMsgList.timestamp)},
                 {"区块哈希": this.blockHashMsgList.hash },
                 {"父块哈希": this.blockHashMsgList.parentHash },
                 {"叔伯哈希": this.blockHashMsgList.uncles },
                 {"矿工": this.blockHashMsgList.miner },
                 {"难度": this.blockHashMsgList.difficulty },
                 {"总难度": this.blockHashMsgList.totalDifficulty },
                 {"燃料上限": this.blockHashMsgList.gasLimit },
                 {"燃料消耗": this.blockHashMsgList.gasUsed },
                 {"操作数": this.blockHashMsgList.nonce },
                 {"附加数据": this.blockHashMsgList.extraData }
             ];
        }
    },
    methods: {
        toBaseChainInfo(item){
            this.$router.push({path: '/baseChainInfo', query: {txHash: item}})
        },
        jumpTo($event,index){
            if(index === 3)
            this.$router.push({path: "/baseChainDetail",query:{blockNumber:this.blockHashMsgList.number - 1}})
        }
    },
   
}
</script>