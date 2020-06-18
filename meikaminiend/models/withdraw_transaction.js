/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('withdraw_transaction', {
    withdrawID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    withdrawAddr: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    coinHash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tokenHash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    coinHashStatus: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    tokenHashStatus: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'withdraw_transaction'
  });
};
