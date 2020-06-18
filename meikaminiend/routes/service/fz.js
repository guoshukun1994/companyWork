const db = require("../../db");
const goodsInfo = db.import("../../models/tgoods_info.js");
const compInfo = db.import("../../models/tcomp_info.js");
const goodsTagInfo = db.import("../../models/tgoods_tag.js");
const logInfo = db.import("../../models/tlog_scan_tag.js");
const crypto = require("crypto"); //sha256中间件
var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider("http://testnode.moacchina.info")); //http://node.moacchina.info  http://testnode.moacchina.info
var contractAddress = "0x6D1A41ca04245917142aB79c4A6598947D40abAd"; //智能合约地址
// var account = {
//     address: "0xBC45e6398255E8c25AF8AA71c7f31a0326e8C52D",
//     secret: "0x91610fe3cef9fb408e7190eb05a38d4bdfae2be478048cb4df9378a0bc29f35d",
// };
var account = {
    address: "0x54DBaEA2D2494E7219D5C3C3efDD4Ba4C0A64360",
    secret: "0x6beed603b4284eea58c34a1d605ddf94f2fc08cbcff3f2282d3cc0bcaf4509fb",
};
var abiString =
    '[ { "constant": false, "inputs": [ { "name": "Code", "type": "string" } ], "name": "handle", "outputs": [ { "name": "", "type": "int256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "name", "type": "string" }, { "name": "vCode", "type": "string" }, { "name": "cCode", "type": "bytes32" } ], "name": "createGoods", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "founder", "outputs": [ { "name": "", "type": "address", "value": "0xbc45e6398255e8c25af8aa71c7f31a0326e8c52d" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "Code", "type": "string" } ], "name": "checkGoods", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "string" }, { "name": "", "type": "int256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "Code", "type": "string" }, { "name": "openID", "type": "string" } ], "name": "useGoods", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getRandom", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "k", "type": "string" } ], "name": "look", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "openID", "type": "string" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "vCode", "type": "string" }, { "indexed": false, "name": "cCode", "type": "bytes32" }, { "indexed": false, "name": "time", "type": "uint256" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "details", "type": "event" } ]'; //智能合约的abi
var abi = JSON.parse(abiString);
var contract = chain3.mc.contract(abi);
var Contract = contract.at(contractAddress);
//在区块链中查询货物状态
async function fz(openID, code, address = "") {
    var data = Contract.handle.call(code); //获取智能合约中该码的状态
    console.log("data", data);
    if (data == 0) {
        //当查询状态为0时，产品不存在
        console.log("乱码");
        return { code: 500, data: "", msg: "不存在此商品" };
    } else if (data == 1) {
        //当查询状态为1时，传入的Code为验证码
        console.log("验证码");
        try {
            //查询Tag表中的商品信息
            let goodsTagMessage = (
                await goodsTagInfo.findOne({
                    where: { check_code: code },
                    attributes: [
                        "goods_CD",
                        "check_code",
                        "reg_hash",
                        "reg_Hash_Datetime",
                        "consume_Hash",
                        "consume_Hash_Datetime",
                        "count",
                        "goods_lot",
                        "goods_Pric",
                        "consume_Status",
                        "first_date",
                    ],
                })
            ).dataValues;
            let checkTime = Date.now() //查询时间
                .toString()
                .substring(0, 10);
            goodsTagMessage.count += 1; //添加查询次数
            //判断该验证码是否被查询过
            if (goodsTagMessage.first_date == null) {
                goodsTagMessage.first_date = checkTime;
                goodsTagInfo
                    .update(
                        {
                            count: goodsTagMessage.count,
                            first_date: checkTime,
                        },
                        { where: { check_code: code } },
                    )
                    .then(result => {
                        console.log("Goods update success");
                    })
                    .catch(err => {
                        console.log("Goods update fail", err);
                    });
            } else {
                goodsTagInfo
                    .update(
                        {
                            count: goodsTagMessage.count,
                        },
                        { where: { check_code: code } },
                    )
                    .then(result => {
                        console.log("Goods update success");
                    })
                    .catch(err => {
                        console.log("Goods update fail", err);
                    });
            }
            //查询商品表中对应商品的信息
            let goodsInfoMessage = (
                await goodsInfo.findOne({
                    where: { goods_CD: goodsTagMessage.goods_CD },
                    attributes: [
                        "goods_Name",
                        "goods_Hash",
                        "goods_Describe",
                        "goods_Spen",
                        "comp_CD",
                        "goods_Photo",
                        "shelf_life",
                    ],
                })
            ).dataValues;
            //查询公司表中对应公司的信息
            let compInfoMessage = (
                await compInfo.findOne({
                    where: { comp_CD: goodsInfoMessage.comp_CD },
                    attributes: [
                        "comp_Name",
                        "comp_Hash",
                        "comp_Photo",
                        "comp_Simp_Name",
                        "comp_Describe",
                        "comp_Leader",
                        "leader_Phone",
                        "comp_Contact",
                        "cont_Phone",
                        "comp_Address",
                        "comp_Buss_Scope",
                    ],
                })
            ).dataValues;
            insertLog(code, address, 0, openID);
            console.log("1");
            return {
                code: 200,
                data: { ...goodsTagMessage, ...goodsInfoMessage, ...compInfoMessage },
                msg: "验证码数据查询成功",
            };
        } catch (e) {
            console.log(e);
            return { code: 500, data: "", msg: "数据获取异常" };
        }
    } else if (data == 2) {
        //当传入状态为2时，传入码为消费码，且已消费
        console.log("消费码已消费");
        try {
            //查询Tag表中该物品的信息
            let goodsTagMessage = (
                await goodsTagInfo.findOne({
                    where: { consume_code: code },
                    attributes: [
                        "goods_CD",
                        "consume_Hash",
                        "consume_Hash_Datetime",
                        "check_code",
                        "consume_code",
                        "goods_lot",
                        "goods_Pric",
                        "reg_hash",
                        "reg_Hash_Datetime",
                    ],
                })
            ).dataValues;
            let goodsInfoMessage = (
                await goodsInfo.findOne({
                    where: { goods_CD: goodsTagMessage.goods_CD },
                    attributes: ["goods_Name", "goods_Photo", "goods_Hash", "goods_Spen", "comp_CD", "shelf_life"],
                })
            ).dataValues;
            let compInfoMessage = (
                await compInfo.findOne({
                    where: { comp_CD: goodsInfoMessage.comp_CD },
                    attributes: ["comp_Name"],
                })
            ).dataValues;
            insertLog(code, address, 0, openID);
            console.log("2");
            return {
                code: 200,
                data: { ...goodsTagMessage, ...goodsInfoMessage, ...compInfoMessage },
                msg: "消费码数据查询成功",
            };
        } catch (e) {
            console.log(e);
            return { code: 500, data: "", msg: "数据获取异常" };
        }
    } else if (data == 3) {
        //当传入状态为3时，Code为消费码，且未消费状态
        console.log("消费码未消费");
        global.nonce++;
        //记录当前的消费时间
        let time = Date.now()
            .toString()
            .substring(0, 10);
        //调用智能合约消费该物品,参数为消费码和OpenID
        var data = Contract.useGoods.getData(code, openID);
        var txCount = global.nonce - 1;
        //   console.log("txcount___________", txCount);
        var rawTx = {
            nonce: chain3.intToHex(txCount),
            gasPrice: chain3.intToHex(35000000000),
            gasLimit: chain3.intToHex(600000),
            to: contractAddress,
            data: data,
            chainId: chain3.version.network,
        };
        var signedTx = chain3.signTransaction(rawTx, account.secret);
        let pro = new Promise(async (resolve, reject) => {
            let Hash;
            try {
                let hash = await chain3.mc.sendRawTransaction(signedTx);
                // if (!err) {
                console.log("succeed: ", hash);
                Hash = hash;
                var filter = chain3.mc.filter("latest");
                filter.watch(async function(error, result) {
                    var receipt = chain3.mc.getTransactionReceipt(hash);
                    // console.log("recepit_______________", receipt);
                    if (!error && receipt && receipt.blockNumber != null) {
                        filter.stopWatching();
                        console.log(hash, "|||||||||", receipt.status);
                        if (receipt.status != "0x0") {
                            //判断状态
                            console.log("done.");
                            //    filter.stopWatching(); //关闭监听
                            let tag = {
                                consume_Status: 1,
                                consumer_CD: openID,
                                consume_Datetime: time,
                                consume_Hash: hash,
                                consume_Hash_Datetime: Date.now()
                                    .toString()
                                    .substring(0, 10),
                            };
                            if (address != "") {
                                //判断是否传入地址
                                console.log("更新tag..............");
                                let add = JSON.parse(address);
                                tag.nation = add.nation;
                                tag.province = add.province;
                                tag.city = add.city;
                                tag.district = add.district;
                                tag.detailedAddress = add.detailedAddress;
                                //       updateTag(tag, code);
                                //  } else {
                                //    updateTag(tag, code);
                            }
                            insertLog(code, address, 0, openID);
                            //_____________________________________________________
                            //获取智能合约中事件的实例对象
                            var eventDetails = Contract.details();
                            try {
                                let T = Date.now()
                                    .toString()
                                    .substring(0, 10);
                                //监听eventDetails事件
                                eventDetails.watch(async function(e, result) {
                                    if (!e) {
                                        var obj = crypto.createHash("sha256"); //将传入的Code进行hash操作
                                        obj.update(code);
                                        var str = "0x" + obj.digest("hex"); //hex是十六进制
                                        if (result.args.openID == openID && result.args.cCode == str) {
                                            try {
                                                tag.reward = result.args.value / 100;
                                                updateTag(tag, code);
                                                let goodsTagMessage = (
                                                    await goodsTagInfo.findOne({
                                                        where: {
                                                            consume_code: code,
                                                        },
                                                        attributes: [
                                                            "goods_CD",
                                                            "consume_Hash",
                                                            "consume_Hash_Datetime",
                                                            "check_code",
                                                            "consume_code",
                                                            "goods_lot",
                                                            "goods_Pric",
                                                            "reg_hash",
                                                            "reg_Hash_Datetime",
                                                        ],
                                                    })
                                                ).dataValues;
                                                goodsTagMessage.consume_Hash = Hash;
                                                goodsTagMessage.consume_Hash_Datetime = time;
                                                let goodsInfoMessage = (
                                                    await goodsInfo.findOne({
                                                        where: {
                                                            goods_CD: goodsTagMessage.goods_CD,
                                                        },
                                                        attributes: [
                                                            "goods_Name",
                                                            "goods_Photo",
                                                            "goods_Hash",
                                                            "goods_Spen",
                                                            "comp_CD",
                                                            "shelf_life",
                                                        ],
                                                    })
                                                ).dataValues;
                                                let compInfoMessage = (
                                                    await compInfo.findOne({
                                                        where: {
                                                            comp_CD: goodsInfoMessage.comp_CD,
                                                        },
                                                        attributes: ["comp_Name"],
                                                    })
                                                ).dataValues;
                                                console.log("转账金额", result.args.value / 100); //转账金额
                                                console.log("3");
                                                console.log("监听关闭");
                                                eventDetails.stopWatching();
                                                resolve({
                                                    code: 200,
                                                    data: {
                                                        ...goodsTagMessage,
                                                        ...goodsInfoMessage,
                                                        ...compInfoMessage,
                                                        reward: result.args.value / 100, //返回的金额 （需要/100）
                                                    },
                                                    msg: "消费成功",
                                                });
                                                return;
                                            } catch (e) {
                                                console.log(e);
                                                resolve({ code: 500, data: "", msg: "消费异常" });
                                            }
                                        }
                                        if (
                                            Date.now()
                                                .toString()
                                                .substring(0, 10) -
                                                T >
                                            120
                                        ) {
                                            console.log("监听超时,关闭监听通道");
                                            eventDetails.stopWatching();
                                            resolve({ code: 500, data: "", msg: "消费超时" });
                                            return;
                                        }
                                    }
                                    // console.log("监听异常,监听关闭");
                                    // eventDetails.stopWatching(); //停止监听防止资源浪费
                                });
                            } catch (e) {
                                console.log(e);
                                reject({
                                    code: 500,
                                    data: "",
                                    msg: "数据事件捕获异常",
                                });
                                return;
                            }
                            //______________________________________________________
                        } else {
                            //   filter.stopWatching();
                            insertLog(code, address, 1, openID);
                            reject({
                                code: 500,
                                data: "",
                                msg: "消费失败",
                            });
                            return;
                        }
                    }
                });
            } catch (e) {
                console.log(e);
                reject({ code: 500, data: "", msg: "数据上链异常" });
                return;
            }
        });
        return pro;
    }
}
function updateTag(tag, code) {
    goodsTagInfo //修改Tag表中商品的状态
        .update(tag, {
            where: {
                consume_code: code,
            },
        })
        .then(result => {
            console.log("Goods update success");
        })
        .catch(err => {
            console.log("Goods update fail", err);
        });
}
function insertLog(code, address, sign, openID) {
    logInfo
        .create({
            tag_Code: code,
            scan_Datetime: Date.now()
                .toString()
                .substring(0, 10),
            scan_Position: address,
            openID: openID,
            fail_sign: sign,
        })
        .then(result => {
            console.log("log create success");
        })
        .catch(err => {
            console.log("log create fail", err);
        });
}
exports.fz = fz;
