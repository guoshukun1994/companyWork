/*
 * @Description: 网易云对象储存的相关操作方法
 * @Author: Chen Chao
 * @Date: 2019-06-11 10:47:19
 * @LastEditTime: 2019-06-13 09:48:37
 * @LastEditors: Chen Chao
 */
const { NosClient } = require("@xgheaven/nos-node-sdk");
const fs = require("fs");

// 获取访问信息，新建实例
const nos = new NosClient({
    accessKey: "509cb4a36f6f479a8a835640a697e5e7",
    accessSecret: "20c0075d16514585a556358f55372c37",
    endpoint: "http://nos-eastchina1.126.net",
    defaultBucket: "diska",
});

const Nos = {
    /**
     * @description 上传文件
     * @param {String} name 储存到对象储存时显示的文件名
     * @param {String} file 本地文件路径
     * @returns {String} 对象储存上文件的url
     */
    async upload(name, file) {
        return nos
            .putObject({
                objectKey: name,
                body: fs.readFileSync(file),
            })
            .then(() => {
                return nos.getObjectUrl({
                    objectKey: name,
                    expires: 1000,
                });
            })
            .then(url => {
                return url;
            });
    },

    /**
     * @description 判断是否存在某文件
     * @param {String} name 储存到对象储存时显示的文件名
     * @returns {Boolean} 是否存在某文件
     */
    async isExist(name) {
        return nos.isObjectExist({ objectKey: name });
    },
};

module.exports = Nos;
