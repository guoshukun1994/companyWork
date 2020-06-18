const db = require("../../../db"); //database实例
const weChatUser = db.import("../../../models/wechat_user.js");
const redisHelper = require("./redis");
const UUID = require("uuid");
var Wallet = require("ethereumjs-wallet"); //npm install -g ethereumjs-wallet
var qr_image = require("qr-image");
const Nos = require("../../../utils/Nos");
const fs = require("fs");
const path = require("path");
const { prefixPhoto, uploadsPath, ipaddress } = require("../../../config/configParam")
const stringRandom = require('string-random')

//=====================================
//图片参数设置
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // cb(null, "uploads/"); // 保存的路径-
//         cb(null, uploadsPath);
//     },
//     filename: function (req, file, cb) {
//         // 将保存文件名时间戳（13位）+源文件名
//         cb(null, prefixPhoto + stringRandom() + Date.now() + file.originalname);
//     },
// });
// var upload = multer({ storage: storage }); // 文件储存路径
//===================================================
async function createSession(openID) {
    let count = await weChatUser.count({ where: { openID: openID } });
    if (count == 0) {
        const wallet = Wallet.generate();
        let address = wallet.getAddressString();
        let privateKey = wallet.getPrivateKeyString();
        var temp_qrcode = qr_image.image(openID, { ec_level: "H", size: 5 }); //设置容错率level为30%
        let p = new Promise((resolve, reject) => {
            let tempPath = prefixPhoto + stringRandom() + Date.now() + openID
            // let P = path.resolve("routes/service/redis/qrCode/" + openID + ".png");
            let P = path.resolve(uploadsPath + `/${tempPath}.png`);

            //let wstream = fs.createWriteStream("./qrCode/" + openID + ".png"); ///创建一个写入流
            let wstream = fs.createWriteStream(P);
            temp_qrcode.pipe(
                wstream.on("error", err => {
                    console.log(err);
                    console.log("qrcode err");
                    resolve({ code: 500, data: "", msg: "二维码生成失败" });
                    return;
                }),
                wstream.on("finish", async function () {
                    console.log("qrcode success");
                    // let storageUrl = await Nos.upload(Date.now() + openID + ".png", "/qrCode/" + openID + ".png");
                    // let storageUrl = await Nos.upload(Date.now() + openID + ".png", P);
                    // fs.unlink(P, function (error) {
                    //     if (error) {
                    //         console.log(error);
                    //     }
                    //     console.log("删除文件成功");
                    // });
                    // let path = storageUrl.split("?")[0];
                    // console.log(path);
                    // console.log("write vCode finished");
                    weChatUser
                        .create({
                            openID: openID,
                            address: address,
                            privateKey: privateKey,
                            QRCodeUrl: `http://${ipaddress}/tokenOrigin/getPhoto?photo=${tempPath}.png`,
                            timestamp: Date.now(),
                        })
                        .then(res => {
                            console.log("insert success");
                        })
                        .catch(err => {
                            console.log("insert fail");
                            console.log(err);
                        });
                    let result = await insertSession(openID);
                    resolve(result);
                    return;
                }),
            );
        });
        return p;
    } else {
        let result = await insertSession(openID);
        return result;
    }
}
async function insertSession(openid) {
    let session = UUID.v1() + Date.now();
    let result = await redisHelper.setString(session, openid);
    if (result == "OK") {
        return session;
    }
    return false;
}
exports.createSession = createSession;
