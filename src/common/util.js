import { tables, DbConnection } from '../common';

const db = new DbConnection();

// TODO: Maybe don't have these args
export const tallyVotes = (req, res, mainTable, voteTable) => {
    db.execute(req, res, 
        `SELECT name, vote 
        FROM ${voteTable} 
        LEFT JOIN ${mainTable} ON ${voteTable}.flavor_id = ${mainTable}.id 
        WHERE food_id = ${req.params.id}`
    );
    // ^ From above, just add all the numbers together, then we'll return it as an object
};

export const tallyFlavorVotes = (req, res) => tallyVotes(req, res, tables.flavors, tables.flavorVotes);

export const tallyTextureVotes = (req, res) => tallyVotes(req, res, tables.textures, tables.textureVotes);

export const tallyMiscVotes = (req, res) => tallyVotes(req, res, tables.misc, tables.miscVotes);

export const getFoodFromId = () => {

}