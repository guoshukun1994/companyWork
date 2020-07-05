<template>
    <div>
        <MyHeader title="区块情况"></MyHeader>
         <FirstInfoContainer title="基础链区块情况"
                            :indexArr="indexArr" 
                            :highIndex="highIndex"
                            :list="blockDetailList" 
                            :inputShow="inputShow"
                            @jumpTo="jumpTo"
                            >
        </FirstInfoContainer>
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
export default {
    name: "baseChainDetail",
    data(){
        return {
            indexArr: [],
            highIndex: 3,
            inputShow: true,
            transactionsList: [],
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
             console.log(res.data);
        }).catch((e)=> {
             console.log('查询基础链区块情况失败',e);
        })
    },
    watch: {
        "$route.query.blockNumber": function(newVal) {
            getBlockHashMsg({ blockNumber: newVal }).then(res => {
                this.blockHashMsgList = res.data;
                this.transactionsList = res.data.transactions;
                console.log(res.data);
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
                 {"叔伯哈希": this.blockHashMsgList.uncles.length ? this.blockHashMsgList.uncles : '无' },
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
        jumpTo(index){
            if(index === 3)
            this.$router.push({path: "/baseChainDetail",query:{blockNumber:this.blockHashMsgList.number - 1}})
        }
    },
   
}
</script>