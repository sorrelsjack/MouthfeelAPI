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

// TODO: Send body rather than this hardcoded string I have
// TODO: Validation to make sure it's not been added before...
// TODO: Upload image -- allow user to supply URL or image from gallery. Also, maybe allow carousel for multiple images?
exports.add_food = (req, res) => {
    const connection = new Connection(config);
    connection.on('connect', error => {
        if (error)
            console.error(error.message);
        else {
            const request = new Request(
                `INSERT INTO dbo.foods VALUES ('pear', 'https://img.freepik.com/free-vector/realistic-isolated-white_97886-3024.jpg?size=338&ext=jpg')`, (error) => { 
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

// TODO: Maybe account for injection lol
// TODO: Standardize errors
exports.get_food_details = (req, res) => {
    const connection = new Connection(config);
    connection.on('connect', error => {
        if (error)
            console.error(error.message);
        else {
            const request = new Request(
                `SELECT * FROM dbo.foods WHERE id = ${req.params.id}`, (error) => { 
                    if (error) console.error(error.message)
                }
            )
            
            request.on('doneInProc', (rowCount, more, rows) => {
                if (!rows.length) return res.status(404).send('Not found');
                res.send(jsonify(rows));
            });

            connection.execSql(request);
        }
    });
};

exports.add_food_flavor = (req, res) => {

};

exports.add_food_texture = (req, res) => {

};

exports.add_food_misc = (req, res) => {

};

exports.add_food_ingredients = (req, res) => {

};

exports.search_foods = (req, res) => {

};

