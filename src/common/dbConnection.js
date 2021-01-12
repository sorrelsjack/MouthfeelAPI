const { config } = require('.');
const jsonify = require('../common/jsonify');

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

// TODO: Incorporate errors here

class DbConnection {
    constructor() {

    }

    execute(req, res, query) {
        return new Promise((resolve, reject) => {
            const connection = new Connection(config);
            connection.on('connect', error => {
                if (error) { console.error(error.message); }
                else {
                    const request = new Request(query, (error) => { if (error) console.error(error.message) })
    
                    request.on('doneInProc', (rowCount, more, rows) => {
                        resolve(jsonify(rows));
                    });
    
                    connection.execSql(request);
                }
            });
        })
    }
}

module.exports = DbConnection;