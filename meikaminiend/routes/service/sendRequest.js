const axios = require("axios");
const subchain = require("../../config/subchainBase");
module.exports = {
    method: {
        GetBalance: "GetBalance",
        GetNonce: "GetNonce",
    },
    message: async function message(method, address) {
        return axios({
            url: subchain.ip1,
            method: "POST",
            data: {
                jsonrpc: "2.0",
                id: 0,
                method: "ScsRPCMethod." + method,
                params: {
                    sender: address,
                    SubChainAddr: subchain.address,
                },
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    },
};
// a.message("GetBalance", "0xc8a866b2145717ffae37d1d0bbb2246e8c960315").then(function(res) {
//     console.log(res);
// });
