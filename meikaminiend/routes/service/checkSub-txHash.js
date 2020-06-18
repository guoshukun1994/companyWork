const checkMethod = require("./checkCoinHash");
const models = require("../../models/models");
//查询交易状态
async function task1() {
    let result = await models.transactionInfo.findAll({
        where: { status: 0 },
        limit: 20,
        offset: 0,
        attributes: ["transactionID", "hash"],
        raw: true,
    });
    let list = [];
    for (let i = 0; i < result.length; i++) {
        let message = await checkMethod(result[i].hash);
        if (!message) {
            result[i].status = 2;
            list.push(result[i]);
        } else {
            result[i].status = 1;
            list.push(result[i]);
        }
    }
    models.withdrawInfo
        .bulkCreate(list, { updateOnDuplicate: ["status"] })
        .then(result => {
            //  console.log(result);
            console.log("交易状态更新成功");
        })
        .catch(err => {
            conosle.log(err);
            console.log("交易状态更新失败");
        });
    return;
}
//查询回馈状态
async function task2() {
    let result = await models.rewardInfo.findAll({
        where: { sign: 0 },
        limit: 20,
        offset: 0,
        raw: true,
    });
    //  console.log(result);
    let list = [];
    for (let i = 0; i < result.length; i++) {
        let message = await checkMethod(result[i].rewardHash);
        if (!message) {
            result[i].sign = 2;
            list.push(result[i]);
        } else {
            result[i].sign = 1;
            list.push(result[i]);
        }
    }
    models.rewardInfo
        .bulkCreate(list, { updateOnDuplicate: ["sign"] })
        .then(result => {
            //  console.log(result);
            console.log("回馈状态更新成功");
        })
        .catch(err => {
            console.log(err);
            console.log("回馈状态更新失败");
        });
    return;
}
task1();
task2();
