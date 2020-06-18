const vnode = require("../../config/vnode");
const Op = require("sequelize").Op;
var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnode.main));
const models = require("../../models/models");
const account = require("../../config/account1");
//20
const erc20 = require("../../config/erc20");
const contractAddress = erc20.address;
var abiString = erc20.abi; //智能合约的abi
var abi = JSON.parse(abiString);
var contract = chain3.mc.contract(abi);
var token = contract.at(contractAddress);
//20------------
async function send20() {
    let result = await models.withdrawInfo.findAll({
        where: {
            [Op.or]: [
                { coinHashStatus: 1, tokenHashStatus: null },
                { coinHashStatus: 1, tokenHashStatus: 2 },
            ],
        },
        attributes: ["withdrawID", "withdrawAddr", "amount"],
        raw: true,
        limit: 20,
        offset: 0,
    });
    console.log(result);
    let nonce = chain3.mc.getTransactionCount(account.address);
    console.log(nonce);
    let list = [];
    for (let i = 0; i < result.length; i++) {
        var txCount = nonce + i;
        var data = token.transfer.getData(result[i].withdrawAddr, result[i].amount);
        let rawTx = {
            from: account.address,
            nonce: chain3.intToHex(txCount),
            gasPrice: chain3.intToHex(30000000000),
            gasLimit: chain3.intToHex(1000000),
            to: contractAddress,
            data: data,
            chainId: chain3.version.network,
        };
        try {
            var signedTx = chain3.signTransaction(rawTx, account.secret);
            let hash = chain3.mc.sendRawTransaction(signedTx);
            console.log(hash);
            result[i].tokenHash = hash;
            result[i].tokenHashStatus = 0;
            //  console.log(result[i]);
            list.push(result[i]);
        } catch (e) {
            console.log(e);
            result[i].tokenHashStatus = 2;
            list.push(result[i]);
        }
    }
    //console.log(111111, list);
    models.withdrawInfo
        .bulkCreate(list, { updateOnDuplicate: ["tokenHash", "tokenHashStatus"] })
        .then(result => {
            // console.log(result);
            console.log("提现状态更新成功");
        })
        .catch(err => {
            conosle.log(err);
            console.log("提现状态更新失败");
        });
}
send20();
