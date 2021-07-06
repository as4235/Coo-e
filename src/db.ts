import knex from "knex";
require('dotenv').config();

const db = knex({
  client: "pg",
  connection: process.env.DB_URL,
  debug: false,
  pool: {
    min: 1,
    max: 7
  },
  acquireConnectionTimeout: 10000
});

export {
  db
};
