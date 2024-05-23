module.exports = {
  dev_db: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    // DB: process.env.SERVICENAME,
    dialect: "oracle",
    // port: 18485,
    port: 1521,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectString: `${process.env.DB_HOST}/${process.env.SERVICENAME}`,
    },
  },
  prod_db: {
    HOST: process.env.PROD_DB_HOST,
    USER: process.env.PROD_DB_USERNAME,
    PASSWORD: process.env.PROD_DB_PASSWORD,
    // DB: process.env.SERVICENAME,
    dialect: "oracle",
    // port: 18485,
    port: 1521,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectString: `${process.env.PROD_DB_HOST}/${process.env.SERVICENAME}`,
    },
  },
};
