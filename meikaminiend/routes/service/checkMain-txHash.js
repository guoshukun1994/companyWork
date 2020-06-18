const vnode = require("../../config/vnode");
var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnode.main));
const models = require("../../models/models");
async function checkHash() {
    let result = await models.withdrawInfo.findAll({
        where: { tokenHashStatus: 0 },
        attributes: ["withdrawID", "tokenHash"],
        raw: true,
        limit: 20,
        offset: 0,
    });
    let list = [];
    for (let i = 0; i < result.length; i++) {
        try {
            let txMsg = chain3.mc.getTransaction(result[i].tokenHash);
            if (!txMsg) {
                result[i].tokenHashStatus = 2;
                list.push(result[i]);
            } else {
                result[i].tokenHashStatus = 1;
                list.push(result[i]);
            }
        } catch (e) {
            result[i].tokenHashStatus = 2;
            list.push(result[i]);
        }
    }
    models.withdrawInfo
        .bulkCreate(list, { updateOnDuplicate: ["tokenHashStatus"] })
        .then(result => {
            //   console.log(result);
            console.log("提现主链交易状态更新成功");
        })
        .catch(err => {
            conosle.log(err);
            console.log("提现主链交易状态更新失败");
        });
    return;
}
checkHash();
