const request = require("request");
const subchain = require("../../config/subchainBase");
module.exports = function searchSubBlockHash(subBlockNumber) {
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
                        subChainAddr: subchain.address,
                        number: Number(subBlockNumber),
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
                    console.log(body.error);
                    resolve({ code: 500, data: "", msg: "交易数据查询失败" });
                    return;
                }
                //   console.log(body.result);
                resolve(body.result);
                return;
            },
        );
    });
};
//checkSubBlockHash(1136);
