var Chain3 = require("chain3");
const vnode = require("../../config/vnode");
const subchain = require("../../config/subchainBase");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnode.main));
const subchainAddress = subchain.address;
// 消费反馈token
module.exports = function sendTransaction(senderAddr, privateKey, toAddr, value, nonce) {
    // console.log( senderAddr, privateKey, toAddr, value, nonce)
    const rawTransaction = {
        from: senderAddr,
        nonce: chain3.intToHex(nonce),
        gasPrice: chain3.intToHex(0),
        gasLimit: chain3.intToHex(0), //子链转账不需要gas费
        to: subchainAddress, //合约地址
        value: chain3.intToHex(value), //转账数量
        shardingFlag: "0x2",
        data: toAddr, //转入账号地址
        via: "0x9F62545597f4eFB61a11D2a6a568eA44855156Ee",
        chainId: chain3.version.network,
    };
    console.log("value", value);

    console.log(rawTransaction);
    let serializedTx = chain3.signTransaction(rawTransaction, privateKey);
    try {
        let resultHash = chain3.mc.sendRawTransaction(serializedTx);
        console.log(resultHash);
        return resultHash;
    } catch (e) {
        console.log(e);
        return false;
    }
};
