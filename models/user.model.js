const { db, DataTypes } = require("../utils/dataBase.utils");

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "normal",
  },
});

module.exports = { User };
