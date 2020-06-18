/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tlog_scan_tag', {
    log_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_Code: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    scan_Datetime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    scan_Position: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    openID: {
      type: DataTypes.STRING(50),
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
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    fail_sign: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    }
  }, {
    tableName: 'tlog_scan_tag'
  });
};
