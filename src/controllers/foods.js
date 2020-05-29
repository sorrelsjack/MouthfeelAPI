import { jsonify, config, DbConnection, tables } from '../common';

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const db = new DbConnection();

exports.get_all_foods = (req, res) => db.execute(req, res, `SELECT * FROM ${tables.foods}`);

// Name and image are all that's required... Flavors, textures, and misc are highly encouraged
/* {
    name:
    image_url:
    flavors: [] (int array)
    textures: [] (int array)
    misc: [] (int array)
    }*/
// TODO: Validation to make sure it's not been added before... Check against name?
// TODO: Upload image -- allow user to supply URL or image from gallery. Also, maybe allow carousel for multiple images?
exports.add_food = (req, res) => {
    if (!req.body.food || !req.body.image_url) return res.status(500).send('Internal server error');

    const connection = new Connection(config);
    connection.on('connect', error => {
        if (error)
            console.error(error.message);
        else {
            const request = new Request(
                `INSERT INTO dbo.foods VALUES ('${req.body.food}', '${req.body.image_url}')`, (error) => { 
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
// TODO: Get all the stuff I need with this call (ingredients, flavors, textures, image, name)
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
    const { flavor_id, user_id, food_id, vote } = req.body;

    if (!flavor_id || !user_id || !food_id || !vote) return res.status(500).send('Internal server error');

    const connection = new Connection(config);
    connection.on('connect', error => {
        if (error)
            console.error(error.message);
        else {
            const request = new Request(
                `INSERT INTO dbo.flavor_votes VALUES ('${flavor_id}', '${user_id}', '${food_id}', ${vote})`, (error) => { 
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

exports.add_food_texture = (req, res) => {

};

exports.add_food_misc = (req, res) => {

};

exports.add_food_ingredients = (req, res) => {

};

exports.search_foods = (req, res) => {

};

