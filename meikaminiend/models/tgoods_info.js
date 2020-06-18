/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tgoods_info', {
    goods_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comp_CD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    goods_CD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    goods_Name: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    goods_Simple_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    goods_Spen: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    goods_Describe: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    goods_Hash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    goods_Hash_Datetime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    goods_Photo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    goods_Memo: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oper_CD: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    shelf_life: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DelFlag: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    add_User: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    add_Date: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    add_AppID: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    add_IP: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    upd_Date: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    upd_User: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    upd_Appid: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    upd_IP: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    version: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'tgoods_info'
  });
};
