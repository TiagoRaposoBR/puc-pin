const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pucpin',
  password: 'postgres',
  port: 5432,
})

module.exports.executeQuery = function(query, result, errorMessage) {
    pool.query(query, (err, res) => {
        if (!err) {
            result(res.rows);
        } else {
            errorMessage(err.message);
        }
    });
}
