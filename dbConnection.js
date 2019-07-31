const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'avd',
    dateStrings:true
});
const connection = function (con) {
    return {
        query: function (query, params) {
            return new Promise(((resolve, reject) => {
                con.query(query, params, (err, results, fields) => {
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve({
                        results: results,
                        fields: fields
                    })
                })
            }))
        },
        release: function () {
            con.release();
        }
    }
};
const getDbConnection = function () {
    return new Promise(((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(connection(con));
        });
    }));
};
module.exports.getDbConnection = getDbConnection;
module.exports.pool=pool;