var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider("http://localhost:8545/testnet")); //http://node.moacchina.info http://testnode.moacchina.info
var contractAddress = "0x6D1A41ca04245917142aB79c4A6598947D40abAd"; //智能合约地址
var account = {
    address: "0xBC45e6398255E8c25AF8AA71c7f31a0326e8C52D",
    secret: "0x91610fe3cef9fb408e7190eb05a38d4bdfae2be478048cb4df9378a0bc29f35d",
};
var abiString =
    '[ { "constant": false, "inputs": [ { "name": "Code", "type": "string" } ], "name": "handle", "outputs": [ { "name": "", "type": "int256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "name", "type": "string" }, { "name": "vCode", "type": "string" }, { "name": "cCode", "type": "bytes32" } ], "name": "createGoods", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "founder", "outputs": [ { "name": "", "type": "address", "value": "0xbc45e6398255e8c25af8aa71c7f31a0326e8c52d" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "Code", "type": "string" } ], "name": "checkGoods", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "string" }, { "name": "", "type": "int256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "Code", "type": "string" }, { "name": "openID", "type": "string" } ], "name": "useGoods", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getRandom", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "k", "type": "string" } ], "name": "look", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "openID", "type": "string" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "vCode", "type": "string" }, { "indexed": false, "name": "cCode", "type": "bytes32" }, { "indexed": false, "name": "time", "type": "uint256" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "details", "type": "event" } ]'; //智能合约的abi
var abi = JSON.parse(abiString);
var contract = chain3.mc.contract(abi);
var Contract = contract.at(contractAddress);
const db = require("../../db");
var tgoods_tag = db.import("../../models/tgoods_tag.js");
const crypto = require("crypto");
var UUID = require("uuid");
var Wallet = require("ethereumjs-wallet");
const wallet = Wallet.generate();
function create(name, goods_CD, goods_lot, price, product_date) {
    //string name,string vCode,bytes32 cCode
    let cCode = wallet.getPublicKeyString();
    var obj = crypto.createHash("sha256");
    obj.update(cCode);
    var str = "0x" + obj.digest("hex"); //hex是十六进制
    console.log("创建货物");
    let time = Date.now()
        .toString()
        .substring(0, 10);
    let vCode = UUID.v1();
    console.log("验证码", vCode);
    console.log("消费码", cCode);
    var data = Contract.createGoods.getData(name, vCode, str);
    var txCount = chain3.mc.getTransactionCount(account.address);
    //console.log("1111111111111111", txCount);
    var rawTx = {
        nonce: chain3.intToHex(txCount),
        gasPrice: chain3.intToHex(30000000000),
        gasLimit: chain3.intToHex(5000000),
        to: contractAddress,
        data: data,
        chainId: chain3.version.network,
    };
    var signedTx = chain3.signTransaction(rawTx, account.secret);
    chain3.mc.sendRawTransaction(signedTx, function(err, hash) {
        if (!err) {
            console.log("succeed: ", hash);
            var filter = chain3.mc.filter("latest");
            filter.watch(function(error, result) {
                var receipt = chain3.mc.getTransaction(hash);
                if (!error && receipt && receipt.blockNumber != null) {
                    console.log("done.");
                    filter.stopWatching();
                    tgoods_tag
                        .create({
                            goods_CD: goods_CD,
                            check_code: vCode,
                            consume_code: cCode,
                            goods_lot: goods_lot,
                            Expire_date: "长期",
                            goods_Pric: price,
                            consume_Status: 0,
                            product_date: product_date,
                            memo: "新品上市",
                            oper_CD: "Nike0002",
                            reg_hash: hash,
                            reg_Hash_Datetime: Date.now()
                                .toString()
                                .substring(0, 10),
                            del_Flag: "0",
                            count: 0,
                            version: 0,
                        })
                        .then(result => {
                            console.log("Goods insert success");
                        })
                        .catch(err => {
                            console.log("Goods insert fail", err);
                        });
                }
            });
        } else {
            console.log("error:", err.message);
        }
    });
    return;
}
create(
    "Nike运动鞋",
    "SH001",
    "N20191025",
    1499,
    Date.now()
        .toString()
        .substring(0, 10),
);
//物品名称,验证码,消费码,货物编号,批次,价格,日期
