'use strict';

module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    filename: DataTypes.STRING,
    description: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    ext: DataTypes.STRING
  }, {});
  State.associate = function(models) {
    // associations can be defined here
  };
  return State;
};