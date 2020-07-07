<template>
    <div class="applicationTra">
        <MyHeader title="交易情况"></MyHeader>
        <div style="width:100%;height: 0.1rem;background: #F6F6F6;"></div>
        <FirstInfoContainer title="应用链交易情况"
                            :indexArr="indexArr" 
                            :highIndex="highIndex"
                            :list="applicationTraList" 
                            :showIndex="showIndex"
                            @jumpTo="jumpTo"
                            >
        </FirstInfoContainer>
    </div>
</template>

<script>
import { getSubTxHashMsg } from '../api/api';
import { timestampToTime } from '@/utils/index';
import { transform } from '@/utils/transform';
export default {
    name: "applicationTra",
    data(){
        return {
            indexArr: [0,3,4,7],
            highIndex: 1,
            showIndex: 7,
            subTxHashMsgList: {
                hash: '',
                blockNumber: '',
                timestamp: '',
                from: '',
                to: '',
                value: '',
                status: '',
                input: '',
            }
        }
    },
    computed: {
        applicationTraList() {
            return [
                 {"交易哈希": this.subTxHashMsgList.hash },
                 {"区块高度": this.subTxHashMsgList.blockNumber },
                 {"交易时间": timestampToTime(this.subTxHashMsgList.timestamp)},
                 {"发送方": this.subTxHashMsgList.from },
                 {"接收方": this.subTxHashMsgList.to },
                 {"金额": this.subTxHashMsgList.value + '  MOAC' },
                 {"交易状态": this.subTxHashMsgList.status },
                 {"附加数据": this.subTxHashMsgList.input }
             ];
        }
    },
    methods: {
        jumpTo(index){
            if(index === 1)
            this.$router.push({ path: '/applicationDetail',query: { blockNumber: this.subTxHashMsgList.blockNumber } })
        }
    },
    created(){
        const { subTxHash } = this.$route.query;
        getSubTxHashMsg({ subTxHash }).then((res)=> {
            let jsonObj = res.data;
            console.log('res.data',res.data);
            this.subTxHashMsgList = transform(jsonObj)
            console.log('this.subTxHashMsgList',this.subTxHashMsgList);
        })
    }
}
</script>
