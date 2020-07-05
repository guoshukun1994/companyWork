<template>
    <div class="baseChainInfo">
        <MyHeader title="交易情况"></MyHeader>
        <FirstInfoContainer title="基础链交易情况" 
                            hash="hash" 
                            :highIndex="highIndex"
                            :indexArr="indexArr"
                            :list="traDetailList" 
                            @jumpTo="jumpTo"
                            :showIndex="showIndex">
        </FirstInfoContainer>
    </div>
</template>

<script>
import { getTxHashMsg } from '../api/api';
import { timestampToTime } from '@/utils/index'
export default {
     name: "baseChainInfo",
     data(){
         return {
            indexArr: [0,3,4,12],
            highIndex: 1,
            showIndex: 12,
            hash: "",
            traDetail: {
                blockHash: "",
                blockNumber: "",
                from: "",
                gas: "",
                gasPrice: "",
                gasUsed: "",
                hash: "",
                input: "",
                nonce: "",
                status: "",
                timestamp: "",
                to: "",
                txCost: "",
                value: "",
            },
         }
     },
     computed: {
         traDetailList(){
             return [
                 {"交易哈希": this.hash },
                 {"区块高度": this.traDetail.blockNumber },
                 {"交易时间": timestampToTime(this.traDetail.timestamp)},
                 {"发送者": this.traDetail.from },
                 {"接收者": this.traDetail.to },
                 {"金额": this.traDetail.value },
                 {"燃料上限": this.traDetail.gas },
                 {"燃料价格": this.traDetail.gasPrice },
                 {"燃料消耗": this.traDetail.gasUsed },
                 {"交易费用": this.traDetail.txCost },
                 {"操作数": this.traDetail.nonce },
                 {"交易状态": this.traDetail.status === "0x1" ? "成功" : "失败"},
                 {"附加数据": this.traDetail.input }
             ];
         }
     },
     created(){
         const {txHash} = this.$route.query;
         this.hash = txHash;
         getTxHashMsg({txHash}).then((res)=> {
             console.log(res.data);
             this.traDetail = res.data;
         }).catch((e)=> {
             console.log('查询交易情况失败',e);
         })
         
     },
     methods: {
         jumpTo(index){
             if(index === 1){
                 this.$router.push({path: "/baseChainDetail",query:{blockNumber:this.traDetail.blockNumber}})
             }
             if(index === 12){
                 this.inputShow = !this.inputShow;
             }
         }
     }
}
</script>

