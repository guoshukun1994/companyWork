const axios = require("axios");
function timeout() {
    axios({
        url: "http://47.56.191.157:50068/rpc",
        method: "POST",
        data: {
            jsonrpc: "2.0",
            id: 0,
            method: "ScsRPCMethod.GetBlockNumber",
            params: {
                SubChainAddr: "0x1a57F5Ee58a0DE2C7065BC2c6b6f33A22b591b2B",
                //  SubChainAddr: "0x1a57F5Ee58a0DE2C7065BC2c6b6f33A22b591b2B",
            },
        },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}
timeout();
