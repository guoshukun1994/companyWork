/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_transaction', {
    transactionID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    senderOpenID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    toOpenID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    amount: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    }
  }, {
    tableName: 'user_transaction'
  });
};
