import { 
    jsonify, 
    config, 
    DbConnection, 
    tables, 
    errors 
} from '../common';

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
// TODO: Prolly make methods to get flavors, ingredients, textures, etc. Then we can call them anywhere in the app
exports.get_food_details = (req, res) => {
    // TODO: Throw error if nothing is returned... maybe have db.execute return something
    // Get info on food
    db.execute(req, res, `SELECT * FROM ${tables.foods} WHERE id = ${req.params.id}`);
    // Get ids of all the flavors it matches, then tally up how many votes each ones has
    db.execute(req, res, `SELECT * FROM ${tables.flavorVotes} WHERE food_id = ${req.params.id}`);
    db.execute(req, res, `SELECT * FROM ${tables.textureVotes} WHERE food_id = ${req.params.id}`);
    db.execute(req, res, `SELECT * FROM ${tables.miscVotes} WHERE food_id = ${req.params.id}`)
};

exports.get_recommended_foods = (req, res) => {};

exports.add_food_flavor = (req, res) => {
    const { flavor_id, user_id, food_id, vote } = req.body;

    if (!flavor_id || !user_id || !food_id || !vote) return res.status(500).send(errors.MISSING_PARAMETERS);

    const connection = new Connection(config);
    connection.on('connect', error => {
        if (error)
            console.error(error.message);
        else {
            const request = new Request(
                `INSERT INTO ${tables.flavorVotes} VALUES ('${flavor_id}', '${user_id}', '${food_id}', ${vote})`, (error) => { 
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

