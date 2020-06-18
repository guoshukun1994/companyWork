const db = require("../../db");
const goodsInfo = db.import("../../models/tgoods_info.js");
const compInfo = db.import("../../models/tcomp_info.js");
const goodsTagInfo = db.import("../../models/tgoods_tag.js");
//根据传入的验证码获取商品信息
let getDetails = async function(code) {
    try {
        //查询Tag表中的商品信息
        let goodsTagMessage = await goodsTagInfo.findOne({
            where: { check_code: code },
            attributes: [
                "goods_ID",
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
                "count",
                "comp_ID",
                "comp_relation",
                "goods_relation",
            ],
            raw: true,
        });
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
                "goods_Spen",
                "comp_CD",
                "goods_Photo",
                "shelf_life",
                "goods_Describe",
                "goods_Memo",
            ],
            raw: true,
        });
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
                "comp_Describe",
            ],
            raw: true,
        });
        list.push(goodsInfoMessage);
        list.push(compInfoMessage);
        let newList = await Promise.all(list);
        //  console.log(newList);
        return {
            code: 200,
            data: { ...goodsTagMessage, ...newList[0], ...newList[1] },
            msg: "详情查询成功",
        };
    } catch (e) {
        console.log(e);
        return { code: 500, data: "", msg: "数据获取异常" };
    }
};
exports.getDetails = getDetails;
