const vnodeMessage = require("../../config/vnode");
var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnodeMessage.main));
module.exports = function searchTxHash(txHash) {
    try {
        let result = chain3.mc.getTransaction(txHash);
        //   console.log(result);
        let timestamp = chain3.mc.getBlock(result.blockNumber).timestamp;
        let result1 = chain3.mc.getTransactionReceipt(txHash);
        delete result.syscnt;
        delete result.transactionIndex;
        delete result.v;
        delete result.r;
        delete result.s;
        delete result.shardingFlag;
        result.status = result1.status;
        result.gasUsed = result1.gasUsed;
        result.txCost = chain3.fromSha(result1.gasUsed * result.gasPrice, "mc"); //交易费用
        result.gasPrice = chain3 //处理科学技术法
            .fromSha(result.gasPrice, "mc")
            .toFixed(18)
            .replace(/\.0+$/, "")
            .replace(/(\.\d+[1-9])0+$/, "$1"); //chain3.fromSha(result.gasPrice, "mc");
        result.timestamp = timestamp;
        //  console.log(result);
        return { code: 200, data: result, msg: "查询主链块信息成功" };
    } catch (e) {
        console.log(e);
        return { code: 500, data: "", msg: "查询主链块信息异常" };
    }
};
//searchTxHash("0xa9e6afa13d1ba5e0da7a2aa903a4af66b6787f2b1bb50d20f70ee14a04c6dc09");
