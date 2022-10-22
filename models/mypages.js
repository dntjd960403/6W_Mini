'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mypages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mypages.init(
    {
      pagesId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.STRING,
      goodsId: DataTypes.STRING,
      goods: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'mypages',
    }
  );
  return mypages;
};