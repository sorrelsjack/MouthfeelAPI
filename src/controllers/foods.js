import { config } from '../constants/dbConfig';
import { jsonify } from '../common/jsonify';

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

exports.get_all_foods = (req, res) => {
    const connection = new Connection(config);
    connection.on('connect', error => {
        if (error)
            console.error(error.message);
        else {
            const request = new Request(
                'SELECT * FROM dbo.foods', (error) => { 
                    if (error) console.error(error.message)
                }
            )
            
            request.on('doneInProc', (rowCount, more, rows) => {
                res.send(jsonify(rows));
            });

            connection.execSql(request);
        }
    });
};

exports.add_food = (req, res) => {

};

exports.get_food = (req, res) => {

};