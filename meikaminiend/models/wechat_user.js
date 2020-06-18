/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wechat_user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    privateKey: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    QRCodeUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'wechat_user'
  });
};
