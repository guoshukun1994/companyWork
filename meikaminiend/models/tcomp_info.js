/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tcomp_info', {
    comp_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comp_CD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    comp_Name: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    comp_Simp_Name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    comp_Describe: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    comp_Leader: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    leader_Phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    comp_Contact: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cont_Phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    comp_Address: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    comp_Buss_Scope: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    comp_URL: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    comp_Photo: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    comp_Logo: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    comp_Hash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    comp_Hash_Datetime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    comp_Code: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    del_Flag: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    oper_CD: {
      type: DataTypes.STRING(200),
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
      allowNull: true,
      defaultValue: '0'
    },
    arguement: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'tcomp_info'
  });
};
