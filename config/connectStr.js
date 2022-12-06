const pgp = require("pg-promise")({});
const databaseConfig = {
  host: "localhost",
  port: 5432,
  database: "dbfood",
  user: "postgres",
  password: "123456",
  max: 30, // use up to 30 connections
};
const db = pgp(databaseConfig);
module.exports = {
  pgp,
  db,
};
