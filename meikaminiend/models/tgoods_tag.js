/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tgoods_tag', {
    tag_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    goods_CD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    check_code: {
      type: DataTypes.STRING(500),
      allowNull: true,
      unique: true
    },
    consume_code: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    goods_lot: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Expire_date: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    goods_Pric: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    consume_Status: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    product_date: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    memo: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    oper_CD: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    reg_hash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    reg_Hash_Datetime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    consumer_CD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    consume_Datetime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    consume_Hash: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    consume_Hash_Datetime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    first_date: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    del_Flag: {
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
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    detailedAddress: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    reward: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    source: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    goods_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    comp_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    comp_relation: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    goods_relation: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    comp_CD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    hash_status: {
      type: DataTypes.STRING(1),
      allowNull: true
    }
  }, {
    tableName: 'tgoods_tag'
  });
};
