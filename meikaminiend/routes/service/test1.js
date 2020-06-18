axios({
    url: "http://47.110.129.12:50068/rpc",
    method: "POST",
    data: {
        jsonrpc: "2.0",
        id: 0,
        method: "ScsRPCMethod.GetNonce",
        params: {
            sender: "0xd7067cd9666167e513c115ddb13601117dc0982d",
            SubChainAddr: "0xac7c54e2b6bae6768bbc90afc51b022e9200a4dc",
        },
    },
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
}).then(res => {
    // console.log(res.data.result);
    global.nonce = res.data.result;
});

export function callContract3(toAddr, orderAmount, nonce) {
    let amountValue = chain3.toSha(orderAmount, "mc");
    const rawTransaction = {
        from: sessionStorage.publicAddress,
        nonce: chain3.intToHex(nonce),
        gasPrice: chain3.intToHex(0),
        gasLimit: chain3.intToHex(0), //子链转账不需要gas费
        to: "0xac7c54e2b6bae6768bbc90afc51b022e9200a4dc", //合约地址
        value: chain3.intToHex(amountValue), //转账数量
        shardingFlag: "0x2",
        data: toAddr, //转入账号地址
        via: chain3.vnode.address,
        chainId: chain3.version.network,
    };

    console.log(rawTransaction);
    let serializedTx = chain3.signTransaction(rawTransaction, sessionStorage.privateKey);
    try {
        let resultHash = chain3.mc.sendRawTransaction(serializedTx);
        return resultHash;
    } catch (e) {
        console.log(e);
        return false;
    }
}
