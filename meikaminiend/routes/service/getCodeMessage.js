const db = require("../../db");
const goodsTagInfo = db.import("../../models/tgoods_tag.js");
const goodsInfo = db.import("../../models/tgoods_info.js");
const compInfo = db.import("../../models/tcomp_info.js");
const txhistory = db.import("../../models/tx_history.js");
//传入hash，是在消费中还是消费完成
async function message(hash) {
    try {
        let result = await txhistory.findOne({ where: { tx_hash: hash }, attributes: ["tx_consume_code"], raw: true });
        let goodsTagMessage = await goodsTagInfo.findOne({
            where: {
                consume_code: result.tx_consume_code,
            },
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
                "reward",
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
            where: {
                comp_ID: companyID,
            },
            attributes: ["comp_Name"],
            raw: true,
        });
        list.push(goodsInfoMessage);
        list.push(compInfoMessage);
        let newList = await Promise.all(list);
        return { code: 200, data: { ...goodsTagMessage, ...newList[0], ...newList[1] }, msg: "查询成功" };
    } catch (e) {
        console.log("数据查询异常", e);
        return { code: 500, data: "", msg: "数据查询异常" };
    }
}
exports.message = message;
