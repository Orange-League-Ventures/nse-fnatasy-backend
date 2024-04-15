const oracledb = require("oracledb");
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
require("dotenv").config();

const selectedDbConfig =
  process.env.NODE_ENV === "production" ? dbConfig.prod_db : dbConfig.dev_db;

const sequelize = new Sequelize(
  selectedDbConfig.DB,
  selectedDbConfig.USER,
  selectedDbConfig.PASSWORD,
  {
    dialect: selectedDbConfig.dialect,
    dialectModule: oracledb,
    operatorsAliases: "0",
    host: selectedDbConfig.HOST,
    port: selectedDbConfig.port,
    pool: selectedDbConfig.pool,
    dialectOptions: selectedDbConfig.dialectOptions,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user/user.model")(sequelize, Sequelize);

module.exports = db;
