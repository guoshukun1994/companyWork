const vnodeMessage = require("../../config/vnode");
var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnodeMessage.main));
module.exports = function searchBlockHash(blockNumber) {
    try {
        let result = chain3.mc.getBlock(blockNumber);
        // console.log(result);
        delete result.logsBloom;
        delete result.mixHash;
        delete result.logsBloom;
        delete result.receiptsRoot;
        delete result.sha3Uncles;
        delete result.size;
        delete result.stateRoot;
        delete result.transactionsRoot;

        return { code: 200, data: result, msg: "主链区块信息查询成功" };
    } catch (e) {
        console.log("主链区块信息查询失败");
        return { code: 500, data: "", msg: "主链区块信息查询失败" };
    }
};
//searchBlockHash(55555);
