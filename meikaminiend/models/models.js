const db = require("../db");
const companyInfo = db.import("./tcomp_info");
const companyPhotoInfo = db.import("./tcomp_photo");
const goodsInfo = db.import("./tgoods_info");
const goodsPhotoInfo = db.import("./tgoods_photo");
const tagInfo = db.import("./tgoods_tag");
const logInfo = db.import("./tlog_scan_tag");
const wechat_user = db.import("./wechat_user");
const transactionInfo = db.import("./user_transaction.js");
const withdrawInfo = db.import("./withdraw_transaction.js");
const txhistoryInfo = db.import("./tx_history.js");
const rewardInfo = db.import("./user_reward.js");
module.exports = {
    companyInfo,
    companyPhotoInfo,
    goodsInfo,
    goodsPhotoInfo,
    tagInfo,
    logInfo,
    wechat_user,
    transactionInfo,
    withdrawInfo,
    txhistoryInfo,
    rewardInfo,
};
