'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boxes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Boxes.init(
    {
      boxId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      goodsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Boxes',
    }
  );
  return Boxes;
};
