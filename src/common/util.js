import { tables, DbConnection } from '../common';

const db = new DbConnection();

/*
        SELECT name, vote 
        FROM flavor_votes
        LEFT JOIN flavors ON flavor_votes.flavor_id = flavors.id
        WHERE food_id = 1
*/

export const tallyVotes = async (req, res, mainTable, voteTable, key) => {
    return await db.execute(req, res, 
        `SELECT name, vote 
        FROM ${voteTable} 
        LEFT JOIN ${mainTable} ON ${voteTable}.${key} = ${mainTable}.id 
        WHERE food_id = ${req.params.id}`
    );
    // ^ From above, just add all the numbers together, then we'll return it as an object
};

export const tallyFlavorVotes = async (req, res) => await tallyVotes(req, res, tables.flavors, tables.flavorVotes, 'flavor_id');

export const tallyTextureVotes = async (req, res) => await tallyVotes(req, res, tables.textures, tables.textureVotes, 'texture_id');

export const tallyMiscVotes = async (req, res) => await tallyVotes(req, res, tables.misc, tables.miscVotes, 'misc_id');

export const getFoodFromId = async (req, res) => (await db.execute(req, res, `SELECT * FROM ${tables.foods} WHERE id = ${req.params.id}`))[0];