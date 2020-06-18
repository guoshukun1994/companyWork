const checkMethod = require("./checkCoinHash");
const models = require("../../models/models");
module.exports = async function task() {

    // async function task() {
    let result = await models.withdrawInfo.findAll({
        where: { coinHashStatus: 0 },
        limit: 20,
        offset: 0,
        attributes: ["withdrawID", "coinHash"],
        raw: true,
    });
    let list = []; //coin转账状态集合
    for (let i = 0; i < result.length; i++) {
        let message = await checkMethod(result[i].coinHash);
        if (!message) {
            result[i].coinHashStatus = 2;
            list.push(result[i]);
        } else {
            result[i].coinHashStatus = 1;
            list.push(result[i]);
        }
    }
    models.withdrawInfo
        .bulkCreate(list, { updateOnDuplicate: ["coinHashStatus"] })
        .then(result => {
            //   console.log(result);
            console.log("提现状态更新成功");
        })
        .catch(err => {
            conosle.log(err);
            console.log("提现状态更新失败");
        });
    return;
}
// task();
