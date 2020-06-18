/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tgoods_photo', {
    photo_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    photo_CD: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    goods_CD: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    photo_Type: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    photo_Name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    photo_Memo: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    oper_CD: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    photo_Hash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    photo_Hash_Datetime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    Del_Flag: {
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
    upd_User: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    upd_Date: {
      type: DataTypes.INTEGER(10),
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
    tableName: 'tgoods_photo'
  });
};
