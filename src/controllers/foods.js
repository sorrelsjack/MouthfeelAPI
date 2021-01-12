const { 
    jsonify,
    config,
    DbConnection,
    tables,
    errors,
    tallyFlavorVotes,
    tallyTextureVotes,
    tallyMiscVotes,
    getFoodFromId 
} = require('../common');

/*
const DbConnection = require('../common/dbConnection');
const tables = require('../common/tables');
const errors = require('../common/errors');
const tallyFlavorVotes = require('../common/')
*/

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const db = new DbConnection();

exports.get_all_foods = async (req, res) => res.send(await db.execute(req, res, `SELECT * FROM ${tables.foods}`));

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
    const { food, image_url } = req.body;

    if (!food || !image_url) return res.status(500).send(errors.MISSING_PARAMETERS);
    // TODO: Do a string.join here with the optional params
    res.send(db.execute(req, res, `INSERT INTO dbo.foods VALUES ('${food}', '${image_url}')`));

    /*const connection = new Connection(config);
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
    });*/
};

// TODO: Maybe account for injection lol
// TODO: Standardize errors
// TODO: Get all the stuff I need with this call (ingredients, flavors, textures, image, name)
// TODO: Account for comments?
// TODO: Prolly make methods to get flavors, ingredients, textures, etc. Then we can call them anywhere in the app
exports.get_food_details = async (req, res) => {
    let foodDetails = {};
    // TODO: Throw error if nothing is returned... maybe have db.execute return something
    const food = getFoodFromId(req, res);
    const flavorVotes = tallyFlavorVotes(req, res);
    const textureVotes = tallyTextureVotes(req, res);
    const miscVotes = tallyMiscVotes(req, res);

    // TODO: Deal with errors in this Promise.all
    await Promise.all([food, flavorVotes, textureVotes, miscVotes]).then((values) => {
        foodDetails = { ...foodDetails, food: values[0], flavors: values[1], textures: values[2], misc: values[3] };
    });

    res.send(foodDetails);
};

exports.get_recommended_foods = (req, res) => { };

// TODO: If they want to 'unvote', delete that row from the DB
exports.add_food_flavor = (req, res) => {
    const { flavor_id, user_id, food_id, vote } = req.body;

    if (!flavor_id || !user_id || !food_id || !vote) return res.status(500).send(errors.MISSING_PARAMETERS);
    res.send(db.execute(req, res, `INSERT INTO ${tables.flavorVotes} VALUES ('${flavor_id}', '${user_id}', '${food_id}', ${vote})`));

    /*const connection = new Connection(config);
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
    });*/
};

exports.add_food_texture = (req, res) => {

};

exports.add_food_misc = (req, res) => {

};

exports.add_food_ingredients = (req, res) => {

};

exports.search_foods = (req, res) => {

};

