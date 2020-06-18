const Sequelize = require("sequelize");
// 读取配置
const mysqlConfig = require("./config/config");

// 根据配置实例化seq
var seq = new Sequelize(mysqlConfig.dbname, mysqlConfig.uname, mysqlConfig.upwd, {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool,
    define: {
        raw: true,
        freezeTableName: true,
        charset: "utf8",
        dialectOptions: {
            collate: "utf8_general_ci",
            requestTimeout: 999999,
        },
        timestamps: false,
    },
    logging: false,
});
module.exports = seq;
