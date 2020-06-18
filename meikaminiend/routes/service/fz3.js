const db = require("../../db");
const goodsInfo = db.import("../../models/tgoods_info.js");
const compInfo = db.import("../../models/tcomp_info.js");
const goodsTagInfo = db.import("../../models/tgoods_tag.js");
const logInfo = db.import("../../models/tlog_scan_tag.js");
const crypto = require("crypto"); //sha256中间件
const vnodeMessage = require("../../config/vnode");
var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnodeMessage.main));
const constractMessage = require("../../config/contract");
const contractAddress = constractMessage.address; //智能合约地址
const abiString = constractMessage.abi; //智能合约的abi
var abi = JSON.parse(abiString);
var contract = chain3.mc.contract(abi);
var Contract = contract.at(contractAddress);
const account = require("../../config/account");
const txHistoryInfo = db.import("../../models/tx_history.js");
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
            let goodsTagMessage = await goodsTagInfo.findOne({
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
                    "goods_ID",
                    "comp_ID",
                    "comp_relation",
                    "goods_relation",
                ],
                raw: true,
            });
            //  console.log(goodsTagMessage);
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
            let list = [];
            let goodsID = goodsTagMessage.goods_ID;
            let companyID = goodsTagMessage.comp_ID;
            let goodsInfoMessage = goodsInfo.findOne({
                where: { goods_ID: goodsID },
                attributes: [
                    "goods_ID",
                    "goods_CD",
                    "goods_Name",
                    "goods_Hash",
                    "goods_Describe",
                    "goods_Memo",
                    "goods_Spen",
                    "comp_CD",
                    "goods_Photo",
                    "shelf_life",
                ],
                raw: true,
            });
            //查询公司表中对应公司的信息
            let compInfoMessage = compInfo.findOne({
                where: { comp_ID: companyID },
                attributes: [
                    "comp_ID",
                    "comp_CD",
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
                    "comp_Logo",
                ],
                raw: true,
            });
            insertLog(code, address, 0, openID);
            list.push(goodsInfoMessage);
            list.push(compInfoMessage);
            let newList = await Promise.all(list);
            console.log("1");
            return {
                code: 200,
                data: { ...goodsTagMessage, ...newList[0], ...newList[1] },
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
            let goodsTagMessage = await goodsTagInfo.findOne({
                where: { consume_code: code },
                attributes: [
                    "goods_ID",
                    "goods_CD",
                    "consume_Hash",
                    "consume_Hash_Datetime",
                    "check_code",
                    "consume_code",
                    "goods_lot",
                    "goods_Pric",
                    "reg_hash",
                    "reg_Hash_Datetime",
                    "comp_ID",
                    "comp_relation",
                    "goods_relation",
                ],
                raw: true,
            });
            let list = [];
            let companyID = goodsTagMessage.comp_ID;
            let goodsID = goodsTagMessage.goods_ID;
            let goodsInfoMessage = goodsInfo.findOne({
                where: { goods_ID: goodsID },
                attributes: [
                    "goods_ID",
                    "goods_CD",
                    "goods_Name",
                    "goods_Photo",
                    "goods_Hash",
                    "goods_Spen",
                    "comp_CD",
                    "shelf_life",
                    "goods_Describe",
                    "goods_Memo",
                ],
                raw: true,
            });
            let compInfoMessage = compInfo.findOne({
                where: { comp_ID: companyID },
                attributes: ["comp_Name"],
                raw: true,
            });
            insertLog(code, address, 0, openID);
            list.push(goodsInfoMessage);
            list.push(compInfoMessage);
            let newList = await Promise.all(list);
            console.log("2");
            return {
                code: 200,
                data: { ...goodsTagMessage, ...newList[0], ...newList[1] },
                msg: "消费码数据查询成功",
            };
        } catch (e) {
            console.log(e);
            return { code: 500, data: "", msg: "数据获取异常" };
        }
    } else if (data == 3) {
        //当传入状态为3时，Code为消费码，且未消费状态
        // console.log("消费码未消费");
        try {
            let result = await txHistoryInfo.findOne({
                where: {
                    tx_openID: openID,
                    tx_consume_code: code,
                },
                raw: true,
            });
            if (result) {
                let msg = await message(code);
                if (msg.code == 200) {
                    msg.data.txHash = result.tx_hash;
                    msg.data.tab = 0;
                    msg.data.sign = 0;
                }
                // console.log(msg);
                return msg;
            }
        } catch (e) {
            console.log(e);
            return { code: 500, data: "", msg: "数据查询异常" };
        }
        global.nonce++;
        //记录当前的消费时间
        let time = Date.now()
            .toString()
            .substring(0, 10);
        //console.log(code, openID);
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
            try {
                let hash = chain3.mc.sendRawTransaction(signedTx);
                // if (!err) {
                console.log("succeed: ", hash);
                await txHistoryInfo.create({
                    tx_hash: hash,
                    tx_status: 0,
                    tx_openID: openID,
                    tx_consume_code: code,
                    tx_timestamp: Date.now(),
                });
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
                }
                // updateTag(tag, code);
                // let goodsTagMessage = await goodsTagInfo.findOne({
                //     where: {
                //         consume_code: code,
                //     },
                //     attributes: [
                //         "comp_ID",
                //         "goods_ID",
                //         "goods_CD",
                //         "goods_lot",
                //         "goods_Pric",
                //         "reg_hash",
                //         "reg_Hash_Datetime",
                //         "relation",
                //     ],
                //     raw: true,
                // });
                // goodsTagMessage.consume_Hash = hash;
                // goodsTagMessage.consume_Hash_Datetime = time;
                // let goodsInfoMessage = (
                //     await goodsInfo.findOne({
                //         where: {
                //             goods_CD: goodsTagMessage.goods_CD,
                //         },
                //         attributes: [
                //             "goods_Name",
                //             "goods_Photo",
                //             "goods_Hash",
                //             "goods_Spen",
                //             "comp_CD",
                //             "shelf_life",
                //             "goods_Describe",
                //             "goods_Memo",
                //         ],
                //     })
                // ).dataValues;
                // // console.log(goodsInfoMessage);
                // let compInfoMessage = (
                //     await compInfo.findOne({
                //         where: {
                //             comp_CD: goodsInfoMessage.comp_CD,
                //         },
                //         attributes: ["comp_Name"],
                //     })
                // ).dataValues;
                let msg = await message(code);
                if (msg.code == 200) {
                    msg.data.consume_Hash = hash;
                    msg.data.consume_Datetime = time;
                    msg.data.tab = 0; //消费中 标记
                    msg.msg = "消费中";
                    resolve(msg);
                } else {
                    msg.msg = "消费失败";
                    resolve(msg);
                }
                // resolve({
                //     code: 200,
                //     data: {
                //         ...goodsTagMessage,
                //         ...goodsInfoMessage,
                //         ...compInfoMessage,
                //         // reward: 200, //返回的金额 （需要/100）
                //         tab: 0,
                //         txHash: hash,
                //     },
                //     msg: "消费中",
                // });
                //_________________________________________________________________
                var filter = chain3.mc.filter("latest");
                let watchTime = Date.now()
                    .toString()
                    .substring(0, 10);
                filter.watch(async function(error, result) {
                    var receipt = chain3.mc.getTransactionReceipt(hash);
                    // console.log("recepit_______________", receipt);
                    if (!error && receipt && receipt.blockNumber != null) {
                        filter.stopWatching();
                        console.log(hash, "|||||||||", receipt.status);
                        if (receipt.status != "0x0") {
                            txHistoryInfo.update({ tx_status: 1 }, { where: { tx_hash: hash } });
                            updateTag(tag, code);
                            //判断状态
                            console.log("done.");
                            //    filter.stopWatching(); //关闭监听
                            insertLog(code, address, 0, openID);
                            return;
                            //_____________________________________________________
                            //获取智能合约中事件的实例对象
                            //______________________________________________________
                        } else {
                            //   filter.stopWatching();
                            txHistoryInfo.update({ tx_status: 2 }, { where: { tx_hash: hash } });
                            insertLog(code, address, 1, openID);
                            return;
                        }
                    }
                    if (
                        Date.now()
                            .toString()
                            .substring(0, 10) -
                            watchTime >
                        180
                    ) {
                        txHistoryInfo.update({ tx_status: 2 }, { where: { tx_hash: hash } });
                        insertLog(code, address, 1, openID);
                        console.log("监听超时,关闭监听通道");
                        filter.stopWatching();
                        return;
                    }
                });
                return; //return promise回调
            } catch (e) {
                console.log(e);
                if (filter) {
                    filter.stopWatching();
                }
                resolve({ code: 500, data: "", msg: "数据上链异常" });
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
async function message(code) {
    try {
        let goodsTagMessage = await goodsTagInfo.findOne({
            where: {
                consume_code: code,
            },
            attributes: [
                "goods_ID",
                "goods_CD",
                "goods_lot",
                "goods_Pric",
                "reg_hash",
                "reg_Hash_Datetime",
                "comp_ID",
                "comp_relation",
                "goods_relation",
            ],
            raw: true,
        });
        let list = [];
        let companyID = goodsTagMessage.comp_ID;
        let goodsID = goodsTagMessage.goods_ID;
        let goodsInfoMessage = await goodsInfo.findOne({
            where: {
                goods_ID: goodsID,
            },
            attributes: [
                "goods_ID",
                "goods_CD",
                "goods_Name",
                "goods_Photo",
                "goods_Hash",
                "goods_Spen",
                "comp_CD",
                "shelf_life",
                "goods_Describe",
                "goods_Memo",
            ],
            raw: true,
        });
        // console.log(goodsInfoMessage);
        let compInfoMessage = compInfo.findOne({
            where: {
                comp_ID: companyID,
            },
            attributes: ["comp_Name"],
            raw: true,
        });
        list.push(goodsInfoMessage);
        list.push(compInfoMessage);
        let newList = await Promise.all(list);
        return { code: 200, data: { ...goodsTagMessage, ...newList[0], ...newList[1] }, msg: "msg查询成功" };
    } catch (e) {
        console.log(e);
        return { code: 500, data: "", msg: "msg查询异常" };
    }
}
exports.fz = fz;
