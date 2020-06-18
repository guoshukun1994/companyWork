var express = require('express');
var router = express.Router();
const axios = require('axios');
var checkCode = require('./service/checkCode');
const db = require('../db'); //database实例
const companyPhoto = db.import('../models/tcomp_photo.js'); //公司图片模型
const goodsPhoto = db.import('../models/tgoods_photo.js'); //货物图片模型
const goodsDetails = require('./service/getDetails');
const fzMethod = require('./service/fz2');
const createSession = require('./service/redis/createSession');
const checkSessionMethod = require('./service/redis/checkSession');
const sendRequest = require('./service/sendRequest');
const dbInfo = require('../models/models');
const txInfo = db.import('../models/tx_history.js');
const messageInfo = require('./service/getCodeMessage');
const searchSubTx = require('./service/searchSubTxHash');
const searchSubBlock = require('./service/searchSubBlockHash');
const searchTxHash = require('./service/searchTxHash');
const searchBlockHash = require('./service/searchBlockHash');
var Chain3 = require('chain3');
var chain3 = new Chain3(new Chain3.providers.HttpProvider('http://node.moacchina.info')); //http://node.moacchina.info
//_________________________________________________获取全局nonce
const account = require('../config/account');
const account1 = require('../config/account1');
const account2 = require('../config/account2');
global.nonce = chain3.mc.getTransactionCount(account.address);
global.nonce1 = chain3.mc.getTransactionCount(account1.address);
sendRequest
    .message(sendRequest.method.GetNonce, account2.address)
    .then(res => {
        if (res.data.err) {
            console.log('回馈账号nonce获取失败');
        }
        global.nonce2 = res.data.result;
        return;
    })
    .catch(err => {
        console.log('回馈账号nonce获取异常');
        console.log(err);
        return;
    });
//_________________________________________________
const Op = require('sequelize').Op;
const txCoinMethod = require('./service/txCoin');
const withdrawMethod = require('./service/tixian');
const getAddress = require('./service/getAddress');
const wechat = require('../config/wechat');
router.get('/', function (req, res, next) {
    res.send('快乐');
});
router.post('/login', function (req, res, next) {
    let code = req.body.wechatCode;
    if (!code) {
        res.send({ code: 500, data: '', msg: '登录异常' });
        return;
    }
    axios
        .get(
            'https://api.weixin.qq.com/sns/jscode2session?appid=' +
            wechat.appid +
            '&secret=' +
            wechat.secret +
            '&js_code=' +
            code +
            '&grant_type=authorization_code',
        )
        .then(async result => {
            // console.log(result);
            if (result.data.errcode) {
                console.log(result.data);
                res.send({ code: 500, data: '', msg: '用户信息获取异常' });
                return;
            }
            let openID = result.data.openid;
            let session = await createSession.createSession(openID);
            if (!session) {
                res.send({ code: 500, data: '', msg: 'session创建失败' });
                return;
            }
            //data.openID = openID;
            //console.log(data);
            res.send({ code: 200, data: { openID, session }, msg: 'session创建成功' });
            return;
        });
});
router.post('/checkCode', async function (req, res) {
    let session = req.get('session');
    //  console.log(session);
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    //查询二维码类型
    let code = req.body.code;
    if (!code) {
        res.send({ code: 500, data: '', msg: '请传入code' });
        return;
    }
    try {
        let type = checkCode.checkMethod(code);
        res.send(type);
        return;
    } catch (e) {
        console.log(e);
        res.send('查询异常');
        return;
    }
});
router.post('/getGoods', async function (req, res) {
    let session = req.get('session');
    console.log(session);
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send('无效session');
        return;
    }
    //根据二维码查询货物
    let code = req.body.code; //获取前端传入的code码
    let openID = msg.openID;
    if (!code) {
        res.send({ code: 500, data: '', msg: '参数异常' });
        return;
    }
    if (req.body.address) {
        // let address = JSON.parse(req.body.address);
        // console.log(address);
        try {
            //let result = await toChainMethod.callContract(code, req.body.address);
            let result = await fzMethod.fz(openID, code, req.body.address);
            res.send(result);
            return;
        } catch (e) {
            console.log('接口捕获', e);
            res.send({ code: 500, data: '', msg: '数据异常' });
            return;
        }
        //  res.send(result);
    } else {
        let result = await fzMethod.fz(openID, code);
        res.send(result);
        return;
    }
});
router.post('/companyPhoto', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    //获取企业图片
    let type = req.body.type; //获取企业图片类型
    let relationString = req.body.comp_relation; //企业资料溯源字段
    try {
        let data = [];
        let relationBody = JSON.parse(relationString);
        console.log(relationBody);
        if (type == '00') {
            let list = relationBody.comp;
            console.log(list);
            if (list.length == 0) {
                res.send({ code: 200, data: '', msg: '企业图片查询成功' });
                return;
            }
            let photoData = await companyPhoto.findAll({
                where: {
                    photo_Hash: { [Op.ne]: null },
                    photo_ID: {
                        [Op.or]: list,
                    },
                },
                attributes: ['photo_Name', 'photo_Hash'],
                raw: true,
            });
            data = photoData;
        } else if (type == '01') {
            let list = relationBody.qual;
            if (list.length == 0) {
                res.send({ code: 200, data: '', msg: '企业图片查询成功' });
                return;
            }
            let photoData = await companyPhoto.findAll({
                where: {
                    photo_Hash: { [Op.ne]: null },
                    photo_ID: {
                        [Op.or]: list,
                    },
                },
                attributes: ['photo_Name', 'photo_Hash'],
                raw: true,
            });
            data = photoData;
        } else {
            let list = relationBody.others;
            if (list.length == 0) {
                res.send({ code: 200, data: '', msg: '企业图片查询成功' });
                return;
            }
            let photoData = await companyPhoto.findAll({
                where: {
                    photo_Hash: { [Op.ne]: null },
                    photo_ID: {
                        [Op.or]: list,
                    },
                },
                attributes: ['photo_Name', 'photo_Hash'],
                raw: true,
            });
            data = photoData;
        }
        res.send({ code: 200, data: data, msg: '企业图片查询成功' });
        return;
    } catch (e) {
        console.log(e);
        res.send({ code: 500, data: '', msg: '图片异常' });
        return;
    }
});
router.post('/goodsPhoto', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    //获取货物图片
    let type = req.body.type;
    // let goods_CD = req.body.goods_CD;
    let relationString = req.body.goods_relation;
    //  console.log("kkkkkk", relationString);
    try {
        let data = [];
        let relationBody = JSON.parse(relationString);
        if (type == '00') {
            let list = relationBody.goods;
            if (list.length == 0) {
                res.send({
                    code: 200,
                    data: '',
                    msg: '货物图片查询成功',
                });
                return;
            }
            let photoData = await goodsPhoto.findAll({
                where: {
                    photo_Hash: { [Op.ne]: null },
                    photo_ID: {
                        [Op.or]: list,
                    },
                },
                attributes: ['photo_Name', 'photo_Hash'],
                raw: true,
            });
            data = photoData;
        } else if (type == '01') {
            let list = relationBody.book;
            if (list.length == 0) {
                res.send({
                    code: 200,
                    data: '',
                    msg: '货物图片查询成功',
                });
                return;
            }
            let photoData = await goodsPhoto.findAll({
                where: {
                    photo_Hash: { [Op.ne]: null },
                    photo_ID: {
                        [Op.or]: list,
                    },
                },
                attributes: ['photo_Name', 'photo_Hash'],
                raw: true,
            });
            data = photoData;
        } else {
            let list = relationBody.others;
            if (list.length == 0) {
                res.send({
                    code: 200,
                    data: '',
                    msg: '货物图片查询成功',
                });
                return;
            }
            let photoData = await goodsPhoto.findAll({
                where: {
                    photo_Hash: { [Op.ne]: null },
                    photo_ID: {
                        [Op.or]: list,
                    },
                },
                attributes: ['photo_Name', 'photo_Hash'],
                raw: true,
            });
            data = photoData;
        }
        // let photoData = await goodsPhoto.findAll({
        //     where: {
        //         goods_CD: goods_CD,
        //         photo_Type: type,
        //         Del_Flag: 0,
        //         photo_Hash: { [Op.ne]: null },
        //     },
        //     attributes: ["photo_Name", "photo_Hash"],
        // });
        res.send({
            code: 200,
            data: data,
            msg: '货物图片查询成功',
        });
        return;
    } catch (e) {
        console.log(e);
        res.send({ code: 500, data: '', msg: '图片异常' });
        return;
    }
});
//获取商品详情接口
router.post('/goodsDetails', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let code = req.body.code;
    if (!code) {
        res.send({ code: 500, data: '', msg: '请传入验证码' });
        return;
    }
    let result = await goodsDetails.getDetails(code);
    res.send(result);
    return;
});
//通过session获取OpenID
router.post('/getOpenID', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    res.send({ code: 200, data: msg.openID, msg: 'openID查询成功' });
    return;
});
//转账接口
router.post('/txCoin', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let senderOpenID = msg.openID;
    let toOpenID = req.body.toOpenID;
    let amount = req.body.amount;
    if (!toOpenID || !amount || toOpenID == '' || amount == '') {
        res.send({ code: 500, data: '', msg: '传入数据异常' });
        return;
    }
    let result = await txCoinMethod.message(senderOpenID, toOpenID, amount);
    if (!result) {
        res.send({ code: 500, data: '', msg: '交易失败' });
        return;
    }
    res.send(result);
    return;
});
//提现功能
router.post('/withdrawCoin', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let openID = msg.openID;
    // let openID = "jkl";
    let address = req.body.withdrawAddress;
    let amount = req.body.amount;
    if (!address || !amount) {
        res.send({ code: 500, data: '', msg: '传入数据异常' });
        return;
    }
    let result = await withdrawMethod.message(openID, address, amount);
    res.send(result);
    return;
});
//提现列表展示
router.post('/withdrawList', async function (req, res) {
    let session = req.get('session');
    // console.log(session);
    // return;
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let openID = msg.openID;
    // let openID = "kkkkk";
    try {
        let result = await dbInfo.withdrawInfo.findAll({
            where: { openID: openID },
            attributes: ['withdrawID', 'withdrawAddr', 'amount', 'timestamp'],
            order: [['timestamp', 'DESC']],
            raw: true,
        });
        for (let i = 0; i < result.length; i++) {
            result[i].timestamp = result[i].timestamp.toString();
        }
        res.send({ code: 200, data: result, msg: '提现列表查询成功' });
        return;
    } catch (e) {
        console.log(e);
        res.send({ code: 500, data: '', msg: '提现列表查询异常' });
        return;
    }
});
//交易列表展示
router.post('/txList', async function (req, res) {
    let session = req.get('session');
    // console.log(session);
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let openID = msg.openID;
    try {
        let result = await dbInfo.transactionInfo.findAll({
            where: { [Op.or]: [{ senderOpenID: openID }, { toOpenID: openID }] },
            attributes: ['transactionID', 'senderOpenID', 'toOpenID', 'amount', 'timestamp', 'status'],
            order: [['timestamp', 'DESC']],
            raw: true,
        });
        res.send({ code: 200, data: result, msg: '交易列表查询成功' });
        return;
    } catch (e) {
        console.log(e);
        res.send({ code: 500, data: '', msg: '交易列表查询异常' });
        return;
    }
});
//获取用户余额
router.post('/getUserBalance', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let openID = msg.openID;
    let address = (await getAddress(openID)).address;
    let balanceRes = await sendRequest.message(sendRequest.method.GetBalance, address);
    let balance = balanceRes.data.result;
    // console.log(balance);
    res.send({ code: 200, data: balance, msg: '获取积分数额成功' });
    return;
});
//获取交易详情
router.post('/getTxDetail', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let openID = msg.openID;
    let transactionID = req.body.transactionID;
    if (!transactionID) {
        res.send({ code: 500, data: '', msg: '入参异常' });
        return;
    }
    let txMessage = await dbInfo.transactionInfo.findOne({
        where: { transactionID: transactionID },
        attributes: ['senderOpenID', 'toOpenID', 'amount', 'hash', 'timestamp', 'status'],
        raw: true,
    });
    txMessage.openID = openID;
    res.send({ code: 200, data: txMessage, msg: '交易信息查询成功' });
    return;
});
//获取提现详情
router.post('/getWithdrawDetail', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let withdrawID = req.body.withdrawID;
    //  console.log(withdrawID);
    if (!withdrawID) {
        res.send({ code: 500, data: '', msg: '入参异常' });
        return;
    }
    let withdrawInfo = await dbInfo.withdrawInfo.findOne({
        where: { withdrawID: withdrawID },
        attributes: [
            'openID',
            'withdrawAddr',
            'amount',
            'coinHash',
            'tokenHash',
            'coinHashStatus',
            'tokenHashStatus',
            'timestamp',
        ],
        raw: true,
    });
    // console.log(withdrawInfo);
    res.send({ code: 200, data: withdrawInfo, msg: '提现详情查询成功' });
    return;
});
//获取二维码信息
router.post('/getQRCode', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let openID = msg.openID;
    try {
        let url = await dbInfo.wechat_user.findOne({ where: { openID: openID }, attributes: ['QRCodeUrl'], raw: true });
        res.send({ code: 200, data: url.QRCodeUrl, msg: '二维码查询成功' });
        return;
    } catch (e) {
        console.log(e);
        res.send({ code: 500, data: '', msg: '二维码获取失败' });
        return;
    }
});
//查询交易hash状态(在消费中下拉时调用)
router.post('/checkHash', async function (req, res) {
    let hash = req.body.txHash;
    if (!hash) {
        res.send({ code: 500, data: '', msg: '请传入hash值' });
        return;
    }
    //console.log(hash);
    let Result;
    try {
        let result = await txInfo.findOne({ where: { tx_hash: hash }, attributes: ['tx_status'], raw: true });

        Result = result;
    } catch (e) {
        console.log(e);
        res.send({ code: 500, data: '', msg: '数据查询异常' });
        return;
    }
    //console.log(Result);
    if (!Result) {
        res.send({ code: 500, data: '', msg: 'hash不存在' });
        return;
    }
    if (Result.tx_status == 0) {
        let message = await messageInfo.message(hash);
        if (message.code == 200) {
            message.data.sign = 0; //消费成功与失败标记，0为上链中 1成功，2为失败
            message.data.txHash = hash;
        }
        res.send(message);
        return;
    } else if (Result.tx_status == 1) {
        let message = await messageInfo.message(hash);
        if (message.code == 200) {
            message.data.sign = 1;
        }
        res.send(message);
        return;
    } else if (Result.tx_status == 2) {
        res.send({ code: 200, data: { sign: 2, txHash: hash }, msg: '消费失败' });
        return;
    }
});
router.post('/getSubTxHashMsg', async function (req, res) {
    let subTxHash = req.body.subTxHash;
    if (!subTxHash) {
        res.send({ code: 500, data: '', msg: '参数异常' });
        return;
    }
    let msg = await searchSubTx(subTxHash);
    res.send(msg);
    return;
});
router.post('/getSubBlockHashMsg', async function (req, res) {
    let subBlockNumber = req.body.subBlockNumber;
    //let subBlockNumber = 232768;
    if (!subBlockNumber) {
        res.send({ code: 500, data: '', msg: '参数异常' });
        return;
    }
    let msg = await searchSubBlock(subBlockNumber);
    // console.log(msg);
    let Txs = [];
    let result;
    if (msg.code == 500) {
        res.send({ code: 500, data: '', msg: '查询异常' });
        return;
    }
    if (msg.Txs.length > 0) {
        for (let i = 0; i < msg.Txs.length; i++) {
            Txs[i] = msg.Txs[i].hash;
        }
    }
    result = { ...msg.Header };
    result.Txs = Txs;
    result.hash = msg.Hash;
    delete result.stateRoot;
    delete result.transactionsRoot;
    delete result.receiptsRoot;
    delete result.Reward;
    delete result.RandomInt1;
    delete result.RandomInt2;
    res.send({ code: 200, data: result, msg: '区块信息查询成功' });
    return;
});
router.post('/getTxHashMsg', function (req, res) {
    let txHash = req.body.txHash;
    //console.log(txHash);
    if (!txHash) {
        res.send({ code: 500, data: '', msg: '参数异常' });
        return;
    }
    let result = searchTxHash(txHash);
    res.send(result);
    return;
});
router.post('/getBlockHashMsg', function (req, res) {
    let blockNumber = req.body.blockNumber;
    // console.log(blockNumber);
    if (!blockNumber) {
        res.send({ code: 500, data: '', msg: '参数异常' });
        return;
    }
    let result = searchBlockHash(blockNumber);
    res.send(result);
    return;
});
router.post('/getTxAddress', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    res.send({ code: 200, data: msg.openID, msg: '地址查询成功' });
    return;
});
//查询奖励列表
router.post('/getRewardList', async function (req, res) {
    let session = req.get('session');
    let msg = await checkSessionMethod.checkSession(session);
    if (!msg.result) {
        res.send({ code: 500, data: '', msg: '无效session' });
        return;
    }
    let openID = msg.openID;
    try {
        let msg = await dbInfo.rewardInfo.findAll({ where: { openID: openID }, raw: true });
        res.send({ code: 200, data: msg, msg: '奖励列表查询成功' });
        return;
    } catch (e) {
        console.log(e);
        res.send({ code: 500, data: '', msg: '奖励列表查询异常' });
        return;
    }
});
module.exports = router;
