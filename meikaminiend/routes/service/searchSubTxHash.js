const request = require("request");
const subchain = require("../../config/subchainBase");
module.exports = async function searchSubTxHash(subTxHash) {
    let p = new Promise((resolve, reject) => {
        request(
            {
                url: subchain.ip1,
                method: "POST",
                json: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: {
                    jsonrpc: "2.0",
                    id: 0,
                    method: "ScsRPCMethod.GetTransactionByHash",
                    params: {
                        SubChainAddr: subchain.address,
                        Hash: subTxHash,
                    },
                },
            },
            async function(err, httpResponse, body) {
                if (err) {
                    console.log("请求块高失败，错误为：-------", err);
                    resolve({ code: 500, data: "", msg: "交易数据查询异常" });
                    return;
                }
                // console.log(body);
                if (body.error) {
                    resolve({ code: 500, data: "", msg: "交易数据查询失败" });
                    return;
                }
                resolve(body.result);
                return;
            },
        );
    });
    let p1 = new Promise((resolve, reject) => {
        request(
            {
                url: subchain.ip1,
                method: "POST",
                json: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: {
                    jsonrpc: "2.0",
                    id: 0,
                    method: "ScsRPCMethod.GetReceiptByHash",
                    params: {
                        SubChainAddr: subchain.address,
                        Hash: subTxHash,
                    },
                },
            },
            async function(err, httpResponse, body) {
                if (err) {
                    console.log("请求块高失败，错误为：-------", err);
                    resolve({ code: 500, data: "", msg: "交易状态查询异常" });
                    return;
                }
                if (body.error) {
                    resolve({ code: 500, data: "", msg: "交易数据查询失败" });
                    return;
                }
                // console.log(body);
                resolve(!body.result.failed);
                return;
            },
        );
    });
    let newList = await Promise.all([p, p1]);
    if (newList[0].code == 500 || newList[1].code == 500) {
        return { code: 500, data: "", msg: "应用链数据查询异常" };
    }
    newList[0].status = newList[1];
    let blockNumber = newList[0].blockNumber;
    delete newList[0].r;
    delete newList[0].s;
    delete newList[0].shardingFlag;
    delete newList[0].syscnt;
    delete newList[0].transactionIndex;
    delete newList[0].v;
    return new Promise((resolve, reject) => {
        request(
            {
                url: subchain.ip1,
                method: "POST",
                json: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: {
                    jsonrpc: "2.0",
                    id: 0,
                    method: "ScsRPCMethod.GetBlock",
                    params: {
                        SubChainAddr: subchain.address,
                        Number: blockNumber,
                    },
                },
            },
            async function(err, httpResponse, body) {
                if (err) {
                    console.log("请求信息失败，错误为：-------", err);
                    resolve({ code: 500, data: "", msg: "交易状态查询异常" });
                    return;
                }
                if (body.error) {
                    resolve({ code: 500, data: "", msg: "交易数据查询失败" });
                    return;
                }
                resolve({
                    code: 200,
                    data: { ...newList[0], timestamp: body.result.Header.timestamp },
                    msg: "应用链交易查询成功",
                });
                return;
            },
        );
    });

    // return { code: 200, data: { ...newList[0] }, msg: "应用链交易查询成功" };
};
//checkSubHash("0x29dca90870fde1b18e2fe9c65a62465e44879d3dc99153ee26427fa2e662e98c");
