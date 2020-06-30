const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const PG_URI = process.env.PG_URI; // 'postgres://pbxpcmxr:jfFOHyIzqG5XBjISQWX4UKDPjj3GLGyh@ruby.db.elephantsql.com:5432/pbxpcmxr';
const PG_URI_ED = process.env.PG_URI_ED;


const pool = new Pool({
  connectionString: PG_URI,
});

const poolEd = new Pool({
  connectionString: PG_URI_ED,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

module.exports = {
  queryNew: (text, params, callback) => {
    console.log('executed query', text);
    return poolEd.query(text, params, callback);
  },
};