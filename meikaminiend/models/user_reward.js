/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_reward', {
    rewardID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openID: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    userAddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sign: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    rewardHash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    rewardTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    goodsCode: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'user_reward'
  });
};
