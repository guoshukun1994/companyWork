const axios = require("axios");
const subchain = require("../../config/subchainBase");
function message(hash) {
    return axios({
        url: subchain.ip1,
        method: "POST",
        data: {
            jsonrpc: "2.0",
            id: 0,
            method: "ScsRPCMethod.GetTransactionByHash",
            params: {
                SubChainAddr: subchain.address,
                Hash: hash,
            },
        },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
}
module.exports = async function checkTx(hash) {
    let res = await message(hash);
    if (res.data.error) {
        //  console.log(false);
        return false;
    }
    // console.log(true);
    return true;
};
//checkTx("0xc6bf05a013c36dd64c6c3c6e6408d85b86563818f270c8cff9c62d0fc29831a1");
