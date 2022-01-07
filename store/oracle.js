const oracleDb = require('oracledb');

const dbConfig = {
    user: 'SYSTEM',
    password: 'ADMINnuevo007',
    connectionString: 'localhost/orcl'
}

let connection;
async function connectToBd() {
    connection = await oracleDb.getConnection(dbConfig);
}

function list() {
    return new Promise((resolve, reject) => {
        connection.execute('SELECT * FROM USERS', [], { outFormat: oracleDb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                reject(err);
            }
            console.log('result');
            resolve(result.rows);
        })

    })
}

function get(id) {
    return new Promise((resolve, reject) => {
        connection.execute('SELECT * FROM USERS WHERE ID = :0', [id], { outFormat: oracleDb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result.rows[0]);

        })
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.execute('SELECT * FROM AUTH WHERE EMAIL = :0', [email], { outFormat: oracleDb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result.rows[0]);
        })

    })
}

function insertAuth(data) {
    return new Promise((resolve, reject) => {
        connection.execute('INSERT INTO AUTH VALUES (:0, :1, :2)', [data.user_id, data.email, data.password], { autoCommit: true }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}


function insert(data) {
    return new Promise((resolve, reject) => {
        connection.execute('INSERT INTO USERS VALUES (:0, :1, :2, :3, :4)', [data.id, data.name, data.lastname, data.email, data.document], { autoCommit: true }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

function update(data) {
    return new Promise((resolve, reject) => {
        connection.execute('UPDATE USERS SET NAME = :0, LASTNAME = :1, EMAIL = :2, DOCUMENT = :3 where id = :4', [data.name, data.lastname, data.email, data.document, data.id], { autoCommit: true }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

function removeUser(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
        connection.execute('DELETE FROM USERS where ID = :0', [id], { autoCommit: true }, (err, result) => {
            console.log(err);
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

connectToBd().then((value) => {
    console.log('db connected');
}).catch((errr) => {
    console.error('error', errr);
});

module.exports = {
    list,
    insert,
    update,
    insertAuth,
    getUserByEmail,
    removeUser,
    get
}