const mysql = require("mysql");

const config = require("../configuration");

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

// Conectar a la base de datos
let connection;

const handleConnection = () => {
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if (err) {
            console.error('[db error]', err);
            setTimeout(handleConnection, 2000);
        } else {
            console.log("BD conectada");
        }
    });

    connection.on('error', err => {
        console.error('[db error]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        } else {
            throw err;
        }
    });
}

handleConnection();

const list = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

const get = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE iduser = ${id}`, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

const upsert = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

const query = (table, query) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res[0] || null);
        });
    });
};

module.exports = {
    list,
    get,
    upsert,
    query
};