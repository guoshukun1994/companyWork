// 镁卡库
var config = {
    dbname: "trace_source",
    uname: "trace_source2020",
    upwd: "trace_source20201234",
    host: "49.233.119.194",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 50,
        min: 0,
        idle: 30000,
        maxIdleTime: 1,
    },
    timezone: "+08:00"
};
module.exports = config;

