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

db.user = require("./user/user.model")(sequelize, Sequelize);

db.question=require("./Quiz/question.model")(sequelize,Sequelize);
db.option=require("./Quiz/options.model")(sequelize,Sequelize);
db.explaination=require("./Quiz/explaination.model")(sequelize,Sequelize);

//Mapping Option Table with Question Table
db.option.belongsTo(db.question,{
  foreignKey: "question_id",
})
db.question.hasMany(db.option,{
  foreignKey: "question_id",
  as:"option"
})

//Mapping explaination Table with Option Table
db.explaination.belongsTo(db.option,{
  foreignKey: "option_id",
})
db.option.hasOne(db.explaination,{
  foreignKey: "option_id",
  as:"explaination"
})

module.exports = db;
