var Chain3 = require("chain3");
const vnode = require("../../config/vnode");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnode.main));
const dbInfo = require("../../models/models");
const sendRequest = require("./sendRequest");
const getAddress = require("./getAddress");
const sendTransaction = require("./sendTransaction");
const checkHashMethod = require("./checkCoinHash");
async function message(senderOpenID, toOpenID, value) {
    let senderMessage = await getAddress(senderOpenID);
    let toMessage = await getAddress(toOpenID);

    let balanceRes = await sendRequest.message(sendRequest.method.GetBalance, senderMessage.address);
    let balance = balanceRes.data.result;
    value = value / 10 ** 18
    let amountValue = chain3.toSha(value, "mc");
    if (Number(balance) < Number(amountValue)) {
        return;
    }
    let nonceRes = await sendRequest.message(sendRequest.method.GetNonce, senderMessage.address);
    let nonce = nonceRes.data.result;
    try {
        let result = sendTransaction(
            senderMessage.address,
            senderMessage.privateKey,
            toMessage.address,
            amountValue,
            nonce,
        );
        if (!result) {
            return { code: 500, data: "", msg: "交易失败" };
        }
        dbInfo.transactionInfo
            .create({
                senderOpenID: senderOpenID,
                toOpenID: toOpenID,
                amount: amountValue,
                hash: result,
                timestamp: Date.now()
                    .toString()
                    .substring(0, 10),
                status: 0,
            })
            .then(res => {
                console.log("transaction insert success");
            })
            .catch(err => {
                console.log("transactionInfo insert fail");
                console.log(err);
            });
        setTimeout(async function () {
            let message = await checkHashMethod(result);
            if (!message) {
                updateTx(result, 2);
            }
            updateTx(result, 1);
        }, 5000);
        return { code: 200, data: result, msg: "交易发起成功" };
    } catch (e) {
        return { code: 501, data: "", msg: "交易失败" };
    }
}
function updateTx(hash, status) {
    dbInfo.transactionInfo
        .update(
            {
                status: status,
            },
            {
                where: { hash: hash },
            },
        )
        .then(res => {
            console.log("transaction update success");
        })
        .catch(err => {
            console.log("transactionInfo update fail");
            console.log(err);
        });
}
exports.message = message;
