const redis = require("redis");

const client = redis.createClient({
    host: "127.0.0.1",
    port: "6379",
});

//连接错误处理
client.on("error", err => {
    console.log("redis connect err", err);
    return false;
});

client.on("connect", () => {
    console.log("redis connect success");
    return true;
});

const redisHelper = {};

redisHelper.setString = (key, value) => {
    //, expire
    return new Promise((resolve, reject) => {
        client.set(key, value, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            // if (!isNaN(expire) && expire > 0) {
            //     client.expire(key, parseInt(expire));
            // }
            resolve(result);
        });
    });
};

redisHelper.getString = key => {
    return new Promise((resolve, reject) => {
        client.get(key, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = redisHelper;
