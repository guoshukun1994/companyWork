/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tmini_amount', {
    id: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      primaryKey: true
    },
    coin: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    }
  }, {
    tableName: 'tmini_amount'
  });
};
