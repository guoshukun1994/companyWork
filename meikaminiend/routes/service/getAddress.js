const dbInfo = require("../../models/models");
module.exports = async openID => {
    const userMessage = await dbInfo.wechat_user.findOne({
        where: { openID: openID },
        attribute: ["address", "privateKey"],
        raw: true,
    });
    return userMessage;
};
