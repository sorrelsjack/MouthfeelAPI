import { jsonify, config } from '.';

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

// TODO: Incorporate errors here

class DbConnection {
    constructor() {

    }

    execute(req, res, query) {
        const connection = new Connection(config);
        connection.on('connect', error => {
            if (error) console.error(error.message);
            else {
                const request = new Request(query, (error) => { if (error) console.error(error.message) })

                request.on('doneInProc', (rowCount, more, rows) => {
                    res.send(jsonify(rows));
                });

                connection.execSql(request);
            }
        });
    }
}

export default DbConnection;