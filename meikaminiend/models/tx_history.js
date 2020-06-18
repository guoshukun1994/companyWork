/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tx_history', {
    tx_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tx_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tx_status: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    tx_openID: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tx_consume_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tx_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tx_history'
  });
};
