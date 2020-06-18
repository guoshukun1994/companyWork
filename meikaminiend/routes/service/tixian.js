var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider("http://node.moacchina.info"));
const erc20 = require("../../config/erc20");
//var chain3 = new Chain3(new Chain3.providers.HttpProvider("http://node.moacchina.info"));
const dbInfo = require("../../models/models");
const contractAddress = erc20.address;
var abiString = erc20.abi; //智能合约的abi
var abi = JSON.parse(abiString);
var contract = chain3.mc.contract(abi);
var token = contract.at(contractAddress);
const sendTransaction = require("./sendTransaction");
const getAddress = require("./getAddress");
const sendRequest = require("./sendRequest");
const account = require("../../config/account1"); //提现地址（转入coin 转出token）

async function message(openID, toAddress, amount) {
    amount = amount / 10 ** 18
    let userMessage = await getAddress(openID); //用户平台地址及私钥
    //验证是否有足够子链币
    let balanceRes = await sendRequest.message(sendRequest.method.GetBalance, userMessage.address);
    if (balanceRes.data.errcode) {
        return { code: 500, data: "", msg: "提现异常(balance)" };
    }
    let balance = balanceRes.data.result;
    let amountValue = chain3.toSha(amount, "mc");

    if (Number(balance) < Number(amountValue)) {
        return { code: 500, data: "", msg: "余额不足" };
    }
    let nonceRes = await sendRequest.message(sendRequest.method.GetNonce, userMessage.address);
    if (nonceRes.data.errcode) {
        return { code: 500, data: "", msg: "提现异常(nonce)" };
    }
    let nonce = nonceRes.data.result;
    let result = sendTransaction(userMessage.address, userMessage.privateKey, account.address, amountValue, nonce);
    if (!result) {
        return { code: 500, data: "", msg: "coin提现失败" };
    }
    dbInfo.withdrawInfo
        .create({
            openID: openID,
            withdrawAddr: toAddress,
            amount: amountValue,
            coinHash: result,
            coinHashStatus: 0,
        })
        .then(result => {
            console.log("insert withdraw success");
        })
        .catch(err => {
            console.log("insert withdraw fail");
            console.log(err);
        });
    return { code: 200, data: result, msg: "提现发起成功" };
}
function updateStatus(hash, status) {
    dbInfo.withdrawInfo
        .update(
            {
                status: status,
            },
            {
                where: { tokenHash: hash },
            },
        )
        .then(result => {
            console.log("update withdraw success");
        })
        .catch(err => {
            console.log("update withdraw fail");
            console.log(err);
        });
}
//message("kkkkk", "0x14bc398dddAC69280d6387959e4631f2Cc1a8Df1", 15);
exports.message = message;
